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

  return (
    // <div>
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc isCentered size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding={0} borderRadius={0}>
          {/* <h1>Oii</h1>
           */}

          <Image
            src={imgUrl}
            marginInline="auto"
            alt=""
            objectFit="cover"
            // position="absolute"
            // mt={8}
            // left={0}
            // top={0}
            // overflow="hidden"
            w="auto"
            h="auto"
            maxHeight={600}
            maxWidth={900}
            // marginInline="auto"
            // borderTopRadius="md"
          />
        </ModalBody>

        <ModalFooter w="100%" display="flex" justifyContent="left" borderRadius={0}>
          <Link
            href={imgUrl}
            isExternal
            textAlign="left"
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
