import React, { useState } from "react";
import { Box, Heading, Text, Button, Stack, Table, Thead, Tbody, Tr, Th, Td, Badge, Stat, StatLabel, StatNumber, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, useDisclosure, IconButton } from "@chakra-ui/react";
import { FaPlus, FaEnvelope, FaPhone, FaEdit, FaTrash } from "react-icons/fa";

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

  const { isOpen: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);

  const { isOpen: isProjectModalOpen, onOpen: onProjectModalOpen, onClose: onProjectModalClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = () => {
    setSelectedProject(null);
    onProjectModalOpen();
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    onProjectModalOpen();
  };

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
  };

  const handleSubmitProject = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.elements.title.value;
    const status = form.elements.status.value;
    const funding = parseFloat(form.elements.funding.value);

    if (selectedProject) {
      const updatedProjects = projects.map((project) => (project.id === selectedProject.id ? { ...project, title, status, funding } : project));
      setProjects(updatedProjects);
    } else {
      const newProject = {
        id: projects.length + 1,
        title,
        status,
        funding,
      };
      setProjects([...projects, newProject]);
    }

    onProjectModalClose();
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    onUserModalOpen();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    onUserModalOpen();
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

    onUserModalClose();
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
          <Button leftIcon={<FaPlus />} colorScheme="teal" mb={4} onClick={handleAddProject}>
            Add Project
          </Button>
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
                  <Td>
                    <IconButton icon={<FaEdit />} aria-label="Edit Project" size="sm" mr={2} onClick={() => handleEditProject(project)} />
                    <IconButton icon={<FaTrash />} aria-label="Delete Project" size="sm" onClick={() => handleDeleteProject(project.id)} />
                  </Td>
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

      <Modal isOpen={isUserModalOpen} onClose={onUserModalClose}>
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

      <Modal isOpen={isProjectModalOpen} onClose={onProjectModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProject ? "Edit Project" : "Add Project"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitProject}>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input type="text" name="title" defaultValue={selectedProject?.title} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Status</FormLabel>
                <Select name="status" defaultValue={selectedProject?.status}>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Funding</FormLabel>
                <Input type="number" name="funding" defaultValue={selectedProject?.funding} required />
              </FormControl>
              <Button type="submit" colorScheme="teal">
                {selectedProject ? "Update" : "Add"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
