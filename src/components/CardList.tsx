import { Grid, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  
  // const [viewImage, setViewImage] = useState('')
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // console.log(viewImage)



  function handleViewImage(url: string): void {
      setSelectedImageUrl(url);
      onOpen();
    }


  // console.log(cards)
  return (
    <>
      {/* TODO CARD GRID */}

      <div>
        <SimpleGrid columns={3} spacing="40px" pb={8}>
          {cards?.map(image => {
            return (
              <Card key={image.id} data={image} viewImage={handleViewImage} />
            );
          })}
        </SimpleGrid>
      </div>

      {/* TODO MODALVIEWIMAGE */}
      {isOpen && (
        <ModalViewImage
          isOpen={isOpen}
          onClose={onClose}
          imgUrl={selectedImageUrl}
        />
      )}
    </>
  );
}
