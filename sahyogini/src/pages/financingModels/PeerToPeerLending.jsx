import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  HStack, 
  Divider,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast
} from '@chakra-ui/react';
import DocumentVerification from './DocumentVerification';

const PeerToPeerLending = () => {
  const [step, setStep] = useState(1);
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    purpose: '',
    duration: '',
    interestRate: '',
    repaymentSchedule: '',
    story: ''
  });
  const [docsVerified, setDocsVerified] = useState(false);
  const toast = useToast();

  const requiredDocuments = [
    {
      type: 'id_proof',
      name: 'Identity Proof',
      description: 'Government issued ID (Aadhar, PAN, Voter ID, etc.)',
      acceptedFormats: '.pdf,.jpg,.png'
    },
    {
      type: 'address_proof',
      name: 'Address Proof',
      description: 'Utility Bill, Bank Statement, etc. (not older than 3 months)',
      acceptedFormats: '.pdf,.jpg,.png'
    },
    {
      type: 'income_proof',
      name: 'Income Proof',
      description: 'Salary slips, IT returns, business financial statements',
      acceptedFormats: '.pdf,.jpg,.png'
    },
    {
      type: 'business_plan',
      name: 'Business Plan/Proposal',
      description: 'Document detailing how the loan will be utilized',
      acceptedFormats: '.pdf,.doc,.docx'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInputChange = (name) => (valueString) => {
    setLoanDetails(prev => ({
      ...prev,
      [name]: valueString
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Loan application submitted",
      description: "Your P2P lending application has been successfully submitted. You'll be notified when lenders show interest.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // Here you would handle the actual submission to your backend
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl">Peer-to-Peer Lending</Heading>
        <Text mt={2} color="gray.600">
          Connect directly with individual lenders for flexible financing options
        </Text>
      </Box>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <VStack spacing={6} align="stretch">
            <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
              <Heading size="md" mb={4}>How P2P Lending Works</Heading>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Box bg="blue.500" color="white" p={2} borderRadius="md" fontWeight="bold">1</Box>
                  <Text>Complete your profile and verify documents</Text>
                </HStack>
                <HStack>
                  <Box bg="blue.500" color="white" p={2} borderRadius="md" fontWeight="bold">2</Box>
                  <Text>Create your loan listing with details and purpose</Text>
                </HStack>
                <HStack>
                  <Box bg="blue.500" color="white" p={2} borderRadius="md" fontWeight="bold">3</Box>
                  <Text>Receive funding offers from multiple lenders</Text>
                </HStack>
                <HStack>
                  <Box bg="blue.500" color="white" p={2} borderRadius="md" fontWeight="bold">4</Box>
                  <Text>Accept the best offer and receive funds</Text>
                </HStack>
                <HStack>
                  <Box bg="blue.500" color="white" p={2} borderRadius="md" fontWeight="bold">5</Box>
                  <Text>Repay according to the agreed schedule</Text>
                </HStack>
              </VStack>
            </Box>
            
            <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
              <Heading size="md" mb={4}>Benefits</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">Lower Interest Rates</Text>
                  <Text fontSize="sm">Competitive rates compared to traditional loans</Text>
                </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">Flexible Terms</Text>
                  <Text fontSize="sm">Customize repayment schedule to your needs</Text>
                </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">Quick Processing</Text>
                  <Text fontSize="sm">Faster approvals than traditional banks</Text>
                </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">No Hidden Fees</Text>
                  <Text fontSize="sm">Transparent fee structure</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>
        
        <Box>
          <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
            <Tabs index={step - 1} onChange={(index) => setStep(index + 1)}>
              <TabList>
                <Tab>Document Verification</Tab>
                <Tab isDisabled={!docsVerified}>Loan Application</Tab>
                <Tab isDisabled={!docsVerified || !loanDetails.amount}>Review & Submit</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <DocumentVerification 
                    requiredDocuments={requiredDocuments} 
                    onVerificationComplete={() => setDocsVerified(true)}
                  />
                  
                  <Button 
                    mt={4} 
                    colorScheme="blue" 
                    isDisabled={!docsVerified}
                    onClick={() => setStep(2)}
                  >
                    Continue to Loan Application
                  </Button>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Loan Amount (₹)</FormLabel>
                      <NumberInput min={5000} max={1000000}>
                        <NumberInputField 
                          name="amount"
                          value={loanDetails.amount}
                          onChange={handleInputChange}
                          placeholder="Enter amount (₹5,000 - ₹10,00,000)"
                        />
                      </NumberInput>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Loan Purpose</FormLabel>
                      <Select 
                        name="purpose"
                        value={loanDetails.purpose}
                        onChange={handleInputChange}
                        placeholder="Select purpose"
                      >
                        <option value="business_expansion">Business Expansion</option>
                        <option value="working_capital">Working Capital</option>
                        <option value="equipment_purchase">Equipment Purchase</option>
                        <option value="inventory_financing">Inventory Financing</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Loan Duration</FormLabel>
                      <Select 
                        name="duration"
                        value={loanDetails.duration}
                        onChange={handleInputChange}
                        placeholder="Select duration"
                      >
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                        <option value="36">36 months</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Preferred Interest Rate (% per annum)</FormLabel>
                      <NumberInput min={6} max={24} step={0.5}>
                        <NumberInputField 
                          name="interestRate"
                          value={loanDetails.interestRate}
                          onChange={handleInputChange}
                          placeholder="Enter preferred rate (6% - 24%)"
                        />
                      </NumberInput>
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>Repayment Schedule</FormLabel>
                      <Select 
                        name="repaymentSchedule"
                        value={loanDetails.repaymentSchedule}
                        onChange={handleInputChange}
                        placeholder="Select schedule"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Your Story (For Lenders)</FormLabel>
                      <Textarea 
                        name="story"
                        value={loanDetails.story}
                        onChange={handleInputChange}
                        placeholder="Tell potential lenders about yourself, your business, and how this loan will help you..."
                        rows={5}
                      />
                    </FormControl>
                    
                    <Button 
                      colorScheme="blue" 
                      isDisabled={!loanDetails.amount || !loanDetails.purpose || !loanDetails.duration || !loanDetails.interestRate || !loanDetails.repaymentSchedule}
                      onClick={() => setStep(3)}
                    >
                      Review Application
                    </Button>
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <Heading size="md" mb={4}>Review Your Application</Heading>
                  
                  <SimpleGrid columns={2} spacing={4} mb={6}>
                    <Stat>
                      <StatLabel>Loan Amount</StatLabel>
                      <StatNumber>₹{loanDetails.amount}</StatNumber>
                    </Stat>
                    
                    <Stat>
                      <StatLabel>Purpose</StatLabel>
                      <StatNumber>{loanDetails.purpose?.replace('_', ' ')}</StatNumber>
                    </Stat>
                    
                    <Stat>
                      <StatLabel>Duration</StatLabel>
                      <StatNumber>{loanDetails.duration} months</StatNumber>
                    </Stat>
                    
                    <Stat>
                      <StatLabel>Interest Rate</StatLabel>
                      <StatNumber>{loanDetails.interestRate}%</StatNumber>
                      <StatHelpText>per annum</StatHelpText>
                    </Stat>
                    
                    <Stat>
                      <StatLabel>Repayment Schedule</StatLabel>
                      <StatNumber>{loanDetails.repaymentSchedule}</StatNumber>
                    </Stat>
                  </SimpleGrid>
                  
                  <Divider my={4} />
                  
                  {loanDetails.story && (
                    <Box mb={6}>
                      <Text fontWeight="bold">Your Story:</Text>
                      <Text mt={2}>{loanDetails.story}</Text>
                    </Box>
                  )}
                  
                  <Button colorScheme="green" size="lg" onClick={handleSubmit}>
                    Submit Loan Application
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default PeerToPeerLending;