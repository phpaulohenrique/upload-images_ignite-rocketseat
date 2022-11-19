import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Mutation, useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface NewImageData{
  image: string;
  title: string;
  description: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {

  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');

  const toast = useToast();

  const acceptedFormatsRegex = /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g;

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: file =>
          file[0].size < 10 * 1024 * 1024 ||
          'O arquivo deve ser menor que 10MB',
        acceptedFormats: file =>
          /image\/(png|jpeg|gif)/.test(file[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres',
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres',
      },
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres',
      },
    },
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(async(image: NewImageData) => {
    const response =  await api.post('/api/images', {
      ...image,
      url: imageUrl,
    })

    // console.log(response)
    // return response.data.image

    }, {
      onSuccess: () => {
        // console.log('opaaaaaa')
        queryClient.invalidateQueries('images')


      }
      // console.log('oi')
    }
    
    
  )


  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();

  const { errors } = formState;

  const onSubmit = async (data: NewImageData): Promise<void> => {
    // console.log(data);
    try {
      // await createImage.mutateAsync(data)

      if(!imageUrl){
        toast({
          title: 'Imagem não adicionada',
          description: 'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        })

        return
      }

      await mutation.mutateAsync(data)

      toast({
        status: 'success',
        title: 'Imagem cadastrada',
        description:
          'Sua imagem foi cadastrada com sucesso.',
        // duration: 4000,
        // isClosable: true,
      });
      console.log(data);


    } catch {
      toast({
        status: 'error',
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        // duration: 4000,
        // isClosable: true,
      });
    } finally {
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal()
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          // name='title'
          placeholder="Título da imagem..."
          // type='text'

          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // name='description'
          // type=""
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
