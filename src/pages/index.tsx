import { Button, Box, Spinner } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

// interface IfetchImagesProps{
//   pageParam?: string | null;
// }

interface Image{
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImageResponse{
  after: string;
  data: Image[]
}


export default function Home(): JSX.Element {


  const fetchImages = async ({pageParam = null}):Promise<GetImageResponse> => {

    const { data } = await api.get<GetImageResponse>('/api/images', {
      params: {
        after: pageParam,
      },
    });

    // console.log(data)
    return data;
  }

  

  // const getNextPageParams = async (after = null) => {
  //   console.log(after)
  //   return after
  // }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
      'images',
      fetchImages,{
      getNextPageParam: lastPage => lastPage.after ?? null
    }, 


  );



  const formattedData = useMemo(() => {

    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat()
    })

    return formatted
  
  }, [data]);



if (isLoading) {
  return <Loading />;
}

  if (isError) {
    return <Error />;
  }



  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20} pb={8}>
        <CardList cards={formattedData} />

        {/* {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>{isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}</Button>
        )} */}

        {hasNextPage && (
          <Box w="100%">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
