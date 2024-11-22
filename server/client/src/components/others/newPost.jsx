import { useEffect, useState } from "react"
import { VStack, FormControl, FormLabel, Input, Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, useToast,
    useDisclosure, } from "@chakra-ui/react"
import postData from "../../backend/postData"

export default function NewPost(props) {
    const toast = useToast()

    const [title, setTitle] = useState() 
    const [fsub, setFsub] = useState() 
    const [content, setContent] = useState()
    const [image, setImage] = useState()
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
        if(props.subs.length===1) {
            console.log("setting sub to", props.subs[0])
            setFsub(props.subs[0])
        }
    },[props.subs])

    async function submitForm() {
        console.log('posting regret')
        const payload = {
            title: title,
            content: content,
            image: image,
            sub: fsub,
        }
        const response = await postData('/api/newpost', payload)
        if(response.data.status==='complete') {
            toast({
            title: 'Posttit',
            description: "Post has been created successfully.",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
          onClose()
          setContent('')
          setTitle('')
          setImage('')
          setFsub('')
          props.refresh()
        }
        else toast({
            title: 'Error Encountered',
            description: "Unknown error encountered while creating a new post.",
            status: 'error',
            duration: 4000,
            isClosable: true,
            })
    }

    return (
        <>

        <Button onClick={onOpen} colorScheme="green">New Post</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Keep on regretting</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <VStack>
                            <FormLabel>SubRegrettit</FormLabel>
                            <Select isDisabled={props.subs.length===1} onChange={(e)=>setFsub(e.target.value)} value={fsub} placeholder={'Where do you want to post it ?'}>
                                {props.subs.map((s,key)=>(
                                    <option key={key} value={s}>{s}</option>
                                ))}
                            </Select>
                            <FormLabel>Post Title</FormLabel>
                            <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder='whats on ur mind'/>
                            <FormLabel>Post Content</FormLabel>
                            <Input value={content} onChange={e=>setContent(e.target.value)} placeholder='tell us about it' />
                            <FormLabel>Image Link</FormLabel>
                            <Input value={image} onChange={e=>setImage(e.target.value)} placeholder='paste hosted link' />
                        </VStack>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button isDisabled={!(title && fsub && (content||image))} onClick={submitForm} colorScheme="green">Spreaddit</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}