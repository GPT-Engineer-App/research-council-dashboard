import React, { useState } from "react";
import { Box, Heading, Text, Button, Stack, Table, Thead, Tbody, Tr, Th, Td, Badge, Stat, StatLabel, StatNumber, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, useDisclosure } from "@chakra-ui/react";
import { FaPlus, FaEnvelope, FaPhone } from "react-icons/fa";

const Index = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: "Project 1", status: "Submitted", funding: 100000 },
    { id: 2, title: "Project 2", status: "Under Review", funding: 250000 },
    { id: 3, title: "Project 3", status: "Approved", funding: 500000 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "read" },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    onOpen();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleSubmitUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const role = form.elements.role.value;

    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map((user) => (user.id === selectedUser.id ? { ...user, name, email, role } : user));
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        name,
        email,
        role,
      };
      setUsers([...users, newUser]);
    }

    onClose();
  };

  const totalFunding = projects.reduce((sum, project) => sum + project.funding, 0);

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Research Council Application Dashboard
      </Heading>

      <Stack spacing={8}>
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Project Overview
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Project Title</Th>
                <Th>Status</Th>
                <Th isNumeric>Funding</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <Tr key={project.id}>
                  <Td>{project.title}</Td>
                  <Td>
                    <Badge colorScheme={project.status === "Approved" ? "green" : project.status === "Under Review" ? "yellow" : "blue"}>{project.status}</Badge>
                  </Td>
                  <Td isNumeric>{project.funding}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Financial Summary
          </Heading>
          <Stat>
            <StatLabel>Total Funding Received</StatLabel>
            <StatNumber>{totalFunding}</StatNumber>
          </Stat>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            User Permissions
          </Heading>
          <Button leftIcon={<FaPlus />} colorScheme="blue" mb={4} onClick={handleAddUser}>
            Add User
          </Button>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Button size="sm" onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Contact Research Council
          </Heading>
          <Stack direction="row" spacing={4}>
            <Button leftIcon={<FaEnvelope />} colorScheme="blue">
              Send Email
            </Button>
            <Button leftIcon={<FaPhone />} colorScheme="green">
              Call
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedUser ? "Edit User" : "Add User"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitUser}>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" defaultValue={selectedUser?.name} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" defaultValue={selectedUser?.email} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Role</FormLabel>
                <Select name="role" defaultValue={selectedUser?.role}>
                  <option value="read">Read</option>
                  <option value="edit">Edit</option>
                  <option value="admin">Admin</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="blue">
                {selectedUser ? "Update" : "Add"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
