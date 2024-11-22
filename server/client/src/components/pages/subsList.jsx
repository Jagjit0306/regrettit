import { useState, useEffect } from "react";
import MainContainer from "../UI/MainContainer";
import { useNavigate } from "react-router";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormLabel, FormControl, Input, useToast, VStack, Text
  } from '@chakra-ui/react'

import postData from "../../backend/postData";
import getData from '../../backend/getData'

export default function SubsList() {
    const toast = useToast()
    const navigate = useNavigate()
    const [sublist, setSublist] = useState()

    async function fetchSubs() {
        const response = await getData('/api/getallsubs')
        // if(response) console.log('subs -> ',response)
        if(response) setSublist(response.data.data)
    }

    function NewSub() {
            
        const [formSName, setFormSName] = useState()
        const [formDes, setFormDes] = useState()

        const { isOpen, onOpen, onClose } = useDisclosure()

        async function submitForm() {
            const payLoad = {
                name: formSName,
                description: formDes
            }
            const response = await postData('/api/newsub', payLoad)
            if(response.data){
                console.log(response.data&&response.data.status)
                if(response.data.status&&response.data.status==='error') toast({
                    title: 'Error Encountered',
                    description: "Unknown error encountered while creating a new regret.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                  })
                else if(response.data.status&&response.data.status==='duplicate') toast({
                    title: 'SubRegrettit already exists',
                    description: "Subs are supposed to be unique.",
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                  })
                else if(response.data.status&&response.data.status==='completed') {toast({
                    title: 'Regret created.',
                    description: "Regret was successfully created.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  });
                  onClose();
                  setFormSName('')
                  setFormDes('')
                  fetchSubs()
                }
            } else {
                toast({
                    title: 'Error Encountered',
                    description: "Unknown error encountered while creating a new regret.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                  })
            }
        }

        return (
            <>
            <Button onClick={onOpen} colorScheme="green">New Subregrettit</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Father a regret</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <VStack>
                            <FormLabel>Sub Name</FormLabel>
                            <Input type='text' onChange={(e)=>{setFormSName(e.target.value)}} 
                            value={formSName} placeholder='Give it a name' />
                            <FormLabel>Sub Description</FormLabel>
                            <Input type='text' onChange={(e)=>{setFormDes(e.target.value)}} 
                            value={formDes} placeholder="What is it 'bout ?" />
                        </VStack>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button isDisabled={!(formSName&&formDes)} onClick={submitForm} colorScheme="green">
                        Gettit
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>
        )
    }

    function SubCards(props) {
        return(
            <VStack style={{width:"100%", border:"1px solid black", borderRadius:"5px", padding:"10px", margin:'auto'}}>
                {/* <Text>{JSON.stringify(props.data)}</Text> */}
                <Text>r/{props.data.name}</Text>
                <Text>Description - {props.data.description}</Text>
                <Button colorScheme="blue" margin={'auto'} onClick={()=>{navigate(`/r/${props.data.name}`)}}>Checkkit</Button>
            </VStack>
        )
    }

    useEffect(()=>{
        fetchSubs()
    },[])

    function Subs(props){
        return (
            <VStack style={{margin:"40px 0px 40px 0px"}}>
            {
                props.data.map((p)=>(<SubCards data={p}/>))
            }
            </VStack>
        )
    }

    return (
        <MainContainer heading='subRegrettits'>
            <NewSub/>
            {
                !(sublist&&sublist.length)?'No subs exist right now':
                <Subs data={sublist}/>
            }
        </MainContainer>
    )
}