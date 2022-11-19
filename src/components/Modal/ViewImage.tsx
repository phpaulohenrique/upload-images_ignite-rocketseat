import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';
import NextLink from "next/link"

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK

  return (
    // <div>
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc isCentered size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          {/* <h1>Oii</h1>
           */}

          <Image
            src={imgUrl}
            alt=""
            objectFit="cover"
            // position="absolute"
            // mt={8}
            left={0}
            top={0}
            // overflow="hidden"
            w="auto"
            h="auto"
            // maxHeight={800}
            // maxWidth={800}
            // marginInline="auto"
            // borderTopRadius="md"
          />
        </ModalBody>

        <ModalFooter w="100%">
          <Link
            href={imgUrl}
            isExternal
            fontSize="sm"
            color="pGray.50"
            _hover={{
              textDecoration: 'none',
              color: 'pGray.100',
            }}
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
