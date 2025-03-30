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
  Progress,
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FiCalendar, FiUsers, FiTarget, FiPlusCircle, FiTrash2 } from 'react-icons/fi';

const Crowdfunding = () => {
  const [step, setStep] = useState(1);
  const [campaignDetails, setCampaignDetails] = useState({
    title: '',
    category: '',
    targetAmount: '',
    duration: '',
    description: '',
    rewards: [],
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (name) => (valueString) => {
    setCampaignDetails((prev) => ({
      ...prev,
      [name]: valueString,
    }));
  };

  const handleSubmit = () => {
    toast({
      title: 'Campaign created',
      description: "Your crowdfunding campaign is now under review. We'll notify you once it's live.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const addReward = () => {
    setCampaignDetails((prev) => ({
      ...prev,
      rewards: [...prev.rewards, { amount: '', description: '', deliveryTime: '' }],
    }));
  };

  const updateReward = (index, field, value) => {
    const updatedRewards = [...campaignDetails.rewards];
    updatedRewards[index][field] = value;
    setCampaignDetails((prev) => ({
      ...prev,
      rewards: updatedRewards,
    }));
  };

  const removeReward = (index) => {
    const updatedRewards = [...campaignDetails.rewards];
    updatedRewards.splice(index, 1);
    setCampaignDetails((prev) => ({
      ...prev,
      rewards: updatedRewards,
    }));
  };

  const isCampaignDetailsValid =
    campaignDetails.title &&
    campaignDetails.category &&
    campaignDetails.targetAmount >= 10000 &&
    campaignDetails.duration &&
    campaignDetails.description;

  const isRewardsValid = campaignDetails.rewards.length > 0;

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl">
          Crowdfunding
        </Heading>
        <Text mt={2} color="gray.600">
          Raise funds for your business or project from a community of backers
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Left Section */}
        <Box>
          <VStack spacing={6} align="stretch">
            <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
              <Heading size="md" mb={4}>
                How Crowdfunding Works
              </Heading>
              <VStack spacing={4} align="stretch">
                {[
                  'Create your campaign with a compelling story',
                  'Set your funding target and campaign duration',
                  'Offer rewards to incentivize contributions',
                  'Share your campaign and engage with backers',
                  'Receive funds when your target is reached',
                ].map((step, index) => (
                  <HStack key={index}>
                    <Box bg="teal.500" color="white" p={2} borderRadius="md" fontWeight="bold">
                      {index + 1}
                    </Box>
                    <Text>{step}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
              <Heading size="md" mb={4}>
                Campaign Types
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {[
                  { title: 'All-or-Nothing', description: 'Receive funds only if you reach your target amount' },
                  { title: 'Keep-What-You-Raise', description: 'Receive all pledged funds regardless of target' },
                ].map((type, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <Text fontWeight="bold">{type.title}</Text>
                    <Text fontSize="sm">{type.description}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>

        {/* Right Section */}
        <Box>
          <Box p={6} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
            <Tabs index={step - 1} onChange={(index) => setStep(index + 1)}>
              <TabList>
                <Tab>Campaign Details</Tab>
                <Tab isDisabled={!isCampaignDetailsValid}>Rewards</Tab>
                <Tab isDisabled={!isCampaignDetailsValid || !isRewardsValid}>Review & Launch</Tab>
              </TabList>

              <TabPanels>
                {/* Campaign Details */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Campaign Title</FormLabel>
                      <Input
                        name="title"
                        value={campaignDetails.title}
                        onChange={handleInputChange}
                        placeholder="Enter a catchy title for your campaign"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Category</FormLabel>
                      <Select
                        name="category"
                        value={campaignDetails.category}
                        onChange={handleInputChange}
                        placeholder="Select category"
                      >
                        {[
                          'Business & Entrepreneurship',
                          'Agriculture & Farming',
                          'Arts & Crafts',
                          'Technology & Innovation',
                          'Education & Training',
                          'Social Enterprise',
                          'Other',
                        ].map((category, index) => (
                          <option key={index} value={category.toLowerCase().replace(/ /g, '_')}>
                            {category}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Funding Target (₹)</FormLabel>
                      <NumberInput
                        min={10000}
                        value={campaignDetails.targetAmount}
                        onChange={handleNumberInputChange('targetAmount')}
                      >
                        <NumberInputField placeholder="Enter target amount (min. ₹10,000)" />
                      </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Campaign Duration (days)</FormLabel>
                      <Select
                        name="duration"
                        value={campaignDetails.duration}
                        onChange={handleInputChange}
                        placeholder="Select duration"
                      >
                        {[15, 30, 45, 60, 90].map((duration) => (
                          <option key={duration} value={duration}>
                            {duration} days
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Campaign Description</FormLabel>
                      <Textarea
                        name="description"
                        value={campaignDetails.description}
                        onChange={handleInputChange}
                        placeholder="Describe your project, what you're raising funds for, and how you'll use them..."
                        rows={6}
                      />
                    </FormControl>

                    <Button
                      colorScheme="teal"
                      isDisabled={!isCampaignDetailsValid}
                      onClick={() => setStep(2)}
                    >
                      Continue to Rewards
                    </Button>
                  </VStack>
                </TabPanel>

                {/* Rewards */}
                <TabPanel>
                  <Heading size="md" mb={4}>
                    Reward Tiers
                  </Heading>
                  <Text mb={4}>
                    Create rewards to encourage backers to contribute to your campaign. Rewards can be products,
                    services, or experiences.
                  </Text>

                  {campaignDetails.rewards.map((reward, index) => (
                    <Box key={index} p={4} mb={4} borderWidth="1px" borderRadius="md">
                      <Flex justify="space-between" align="center" mb={3}>
                        <Heading size="sm">Reward Tier {index + 1}</Heading>
                        <IconButton
                          icon={<FiTrash2 />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => removeReward(index)}
                        />
                      </Flex>

                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired>
                          <FormLabel>Pledge Amount (₹)</FormLabel>
                          <NumberInput
                            min={100}
                            value={reward.amount}
                            onChange={(valueString) => updateReward(index, 'amount', valueString)}
                          >
                            <NumberInputField placeholder="Min. ₹100" />
                          </NumberInput>
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel>Estimated Delivery</FormLabel>
                          <Select
                            value={reward.deliveryTime}
                            onChange={(e) => updateReward(index, 'deliveryTime', e.target.value)}
                            placeholder="Select when"
                          >
                            {['Immediate', 'Within 1 month', 'Within 3 months', 'Within 6 months', 'Custom timeframe'].map(
                              (time, idx) => (
                                <option key={idx} value={time.toLowerCase().replace(/ /g, '_')}>
                                  {time}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </SimpleGrid>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Reward Description</FormLabel>
                        <Textarea
                          value={reward.description}
                          onChange={(e) => updateReward(index, 'description', e.target.value)}
                          placeholder="Describe what backers will receive for this pledge amount..."
                          rows={3}
                        />
                      </FormControl>
                    </Box>
                  ))}

                  <Button
                    leftIcon={<FiPlusCircle />}
                    variant="outline"
                    colorScheme="teal"
                    onClick={addReward}
                    mb={4}
                    w="full"
                  >
                    Add Reward Tier
                  </Button>

                  <Button
                    colorScheme="teal"
                    isDisabled={!isRewardsValid}
                    onClick={() => setStep(3)}
                    mt={4}
                  >
                    Continue to Review
                  </Button>
                </TabPanel>

                {/* Review & Launch */}
                <TabPanel>
                  <Heading size="md" mb={4}>
                    Review Your Campaign
                  </Heading>

                  <Box p={4} mb={6} borderWidth="1px" borderRadius="md">
                    <Heading size="md" mb={2}>{campaignDetails.title || 'Campaign Title'}</Heading>
                    <Badge colorScheme="teal" mb={2}>
                      {campaignDetails.category?.replace('_', ' ') || 'Category'}
                    </Badge>

                    <SimpleGrid columns={3} spacing={4} mt={4}>
                      <Stat>
                        <StatLabel>
                          <FiTarget /> Target
                        </StatLabel>
                        <StatNumber>₹{campaignDetails.targetAmount}</StatNumber>
                      </Stat>

                      <Stat>
                        <StatLabel>
                          <FiCalendar /> Duration
                        </StatLabel>
                        <StatNumber>{campaignDetails.duration} days</StatNumber>
                      </Stat>

                      <Stat>
                        <StatLabel>
                          <FiUsers /> Reward Tiers
                        </StatLabel>
                        <StatNumber>{campaignDetails.rewards.length}</StatNumber>
                      </Stat>
                    </SimpleGrid>
                  </Box>

                  <Box mb={6}>
                    <Heading size="sm" mb={2}>
                      Campaign Description
                    </Heading>
                    <Text>{campaignDetails.description}</Text>
                  </Box>

                  {campaignDetails.rewards.length > 0 && (
                    <Box mb={6}>
                      <Heading size="sm" mb={2}>
                        Reward Tiers
                      </Heading>
                      {campaignDetails.rewards.map((reward, index) => (
                        <Box key={index} p={3} mb={2} borderWidth="1px" borderRadius="md">
                          <Flex justify="space-between">
                            <Text fontWeight="bold">₹{reward.amount}</Text>
                            <Badge>{reward.deliveryTime?.replace('_', ' ')}</Badge>
                          </Flex>
                          <Text mt={1} fontSize="sm">{reward.description}</Text>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Divider my={4} />

                  <Button colorScheme="green" size="lg" onClick={handleSubmit}>
                    Launch Campaign
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

export default Crowdfunding;