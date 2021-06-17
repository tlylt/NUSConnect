import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { updateUser, useUser } from './UserAPI'
import { Formik, Field, Form } from 'formik'
import { toast } from 'react-toastify'
export default function ProfileHeader(): JSX.Element {
  const [name, setName] = useState('user')
  const [imageUrl, setImageUrl] = useState('/cat.jpg')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()

  const { user, isLoading } = useUser()
  useEffect(() => {
    if (!isLoading) {
      setName(user.displayName)
      setImageUrl(user.profilePicUrl)
    }
  }, [user, isLoading])

  function validateName(value): string {
    let error: string
    if (!value) {
      error = 'Name is required'
    }
    return error
  }

  return (
    <>
      <div className="flex flex-row items-start gap-4 border-b border-gray p-4 w-full">
        <img src={imageUrl} alt="profile-pic" className="h-28 rounded-lg" />
        <div className="h-28 w-full flex flex-col justify-between ">
          <div>
            <p className="text-gray-800 dark:text-white text-xl font-medium">{name}</p>
            <p className="text-gray-400 text-xs">{isLoading ? 'userName' : user.userName}</p>
            <p className="text-gray-400 text-xs">Role: {isLoading ? 'nothing' : user.role}</p>
          </div>
          <div className="max-w-max rounded-lg bg-blue-100 dark:bg-white p-2">
            <div className="flex flex-row space-x-3 items-center text-xs text-gray-400 dark:text-black">
              <p className="flex flex-col ">
                Total Posts
                <span className="text-black dark:text-indigo-500 font-bold">2</span>
              </p>
              <p className="flex flex-col">
                Total Replies
                <span className="text-black dark:text-indigo-500 font-bold">5</span>
              </p>
              <p className="flex flex-col">
                Total Quizzes
                <span className="text-black dark:text-indigo-500 font-bold">9</span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-28 flex flex-col justify-between">
          <Button colorScheme="teal" variant="outline" onClick={onOpen}>
            Edit profile
          </Button>
        </div>
      </div>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your account info</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Formik
                initialValues={{ name: user.displayName }}
                onSubmit={(values, actions) => {
                  updateUser(user.id, values.name)
                  setTimeout(() => {
                    toast.success('Updated!')
                    actions.setSubmitting(false)
                  }, 1000)
                }}>
                {(props) => (
                  <Form>
                    <Field name="name" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                          <FormLabel>Display Name</FormLabel>
                          <Input
                            {...field}
                            ref={initialRef}
                            placeholder="Pick a new one!"
                            autoComplete="off"
                          />
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
