import React, { useState, useEffect } from 'react';
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
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    Textarea,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Tooltip,
    useToast,
    Icon,
    Flex,
    Badge,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Link,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepTitle,
    StepDescription,
    StepSeparator,
    useSteps
} from '@chakra-ui/react';
import {
    FiDollarSign,
    FiTrendingUp,
    FiCalendar,
    FiPieChart,
    FiDownload,
    FiInfo,
    FiArrowUp,
    FiArrowDown,
    FiSave,
    FiShare2,
    FiCheckCircle,
    FiAlertCircle,
    FiUpload,
    FiEdit,
    FiFilePlus
} from 'react-icons/fi';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Import DocumentVerification component
import DocumentVerification from './DocumentVerification';

const RevenueBasedFinancialModel = () => {
    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    // Financial model state
    const [businessDetails, setBusinessDetails] = useState({
        businessName: '',
        industry: '',
        businessStage: 'early',
        currentRevenue: 0,
        revenueFrequency: 'monthly',
        operatingCosts: 0,
        projectionPeriod: 36,
        growthRate: 15,
        profitMargin: 20,
        fundingNeeded: 0,
        paybackPercentage: 6,
        paybackCap: 1.8
    });

    // Calculated financial projections
    const [financialProjections, setFinancialProjections] = useState({
        monthlyData: [],
        summary: {
            totalRevenue: 0,
            totalProfit: 0,
            totalRepayment: 0,
            repaymentPeriod: 0,
            roi: 0,
            averageMonthlyPayment: 0
        }
    });

    // Model state and validation
    const [isModelReady, setIsModelReady] = useState(false);
    const [documentVerificationComplete, setDocumentVerificationComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const { isOpen: isDocUploadOpen, onOpen: onDocUploadOpen, onClose: onDocUploadClose } = useDisclosure();
    const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
    const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const cancelRef = React.useRef();

    // Required documents for verification
    const requiredDocuments = [
        {
            type: 'business_registration',
            name: 'Business Registration Certificate',
            description: 'Certificate of incorporation or business registration document',
            acceptedFormats: '.pdf,.jpg,.png'
        },
        {
            type: 'financial_statements',
            name: 'Financial Statements',
            description: 'Last 12 months of financial statements or bank statements',
            acceptedFormats: '.pdf,.xlsx,.csv'
        },
        {
            type: 'tax_returns',
            name: 'Tax Returns',
            description: 'Last fiscal year tax returns',
            acceptedFormats: '.pdf'
        },
        {
            type: 'revenue_proof',
            name: 'Revenue Proof',
            description: 'Documentation proving your current revenue claims',
            acceptedFormats: '.pdf,.xlsx,.csv'
        }
    ];

    // Steps for financial model completion
    const steps = [
        { title: 'Business Details', description: 'Enter your business information' },
        { title: 'Financial Inputs', description: 'Provide revenue and cost data' },
        { title: 'Funding Requirements', description: 'Set funding needs and terms' },
        { title: 'Document Verification', description: 'Upload required documents' },
        { title: 'Review & Finalize', description: 'Review and submit your model' }
    ];

    const { activeStep, setActiveStep } = useSteps({
        index: currentStep,
        count: steps.length,
    });

    // ROI calculation for investors
    const calculateROI = (investment, totalRepayment) => {
        return ((totalRepayment / investment) - 1) * 100;
    };

    // Generate financial projections based on inputs
    useEffect(() => {
        if (businessDetails.currentRevenue <= 0 || businessDetails.fundingNeeded <= 0) {
            return;
        }

        generateProjections();
    }, [businessDetails]);

    const generateProjections = () => {
        const {
            currentRevenue,
            revenueFrequency,
            growthRate,
            projectionPeriod,
            operatingCosts,
            profitMargin,
            fundingNeeded,
            paybackPercentage,
            paybackCap
        } = businessDetails;

        // Convert revenue to monthly if needed
        let monthlyRevenue = currentRevenue;
        if (revenueFrequency === 'annually') {
            monthlyRevenue = currentRevenue / 12;
        } else if (revenueFrequency === 'quarterly') {
            monthlyRevenue = currentRevenue / 3;
        }

        // Monthly growth rate
        const monthlyGrowthRate = Math.pow(1 + (growthRate / 100), 1 / 12) - 1;

        // Calculate monthly projections
        let monthlyData = [];
        let totalRevenue = 0;
        let totalProfit = 0;
        let totalRepayment = 0;
        let repaymentComplete = false;
        let repaymentPeriod = 0;

        // Maximum repayment (cap)
        const maxRepayment = fundingNeeded * paybackCap;

        for (let month = 1; month <= projectionPeriod; month++) {
            // Project revenue with compound growth
            const projectedRevenue = monthlyRevenue * Math.pow(1 + monthlyGrowthRate, month - 1);

            // Calculate monthly profit based on margin
            const monthlyProfit = projectedRevenue * (profitMargin / 100) - operatingCosts;

            // Calculate revenue share payment (if not yet reached repayment cap)
            let revenueSharePayment = 0;
            if (totalRepayment < maxRepayment && !repaymentComplete) {
                revenueSharePayment = projectedRevenue * (paybackPercentage / 100);
                totalRepayment += revenueSharePayment;

                // Check if this month completes the repayment
                if (totalRepayment >= maxRepayment) {
                    revenueSharePayment -= (totalRepayment - maxRepayment);
                    totalRepayment = maxRepayment;
                    repaymentComplete = true;
                    repaymentPeriod = month;
                }
            }

            // Net profit after revenue share payment
            const netProfit = monthlyProfit - revenueSharePayment;

            // Add to totals
            totalRevenue += projectedRevenue;
            totalProfit += netProfit;

            // Add to monthly data array for charting
            monthlyData.push({
                month,
                revenue: Math.round(projectedRevenue),
                profit: Math.round(monthlyProfit),
                payment: Math.round(revenueSharePayment),
                netProfit: Math.round(netProfit),
                cumulativeRepayment: Math.round(totalRepayment)
            });

            // If we haven't determined repayment period yet and this is the last month
            if (!repaymentComplete && month === projectionPeriod) {
                repaymentPeriod = projectionPeriod + '+';
            }
        }

        // Calculate ROI
        const roi = calculateROI(fundingNeeded, totalRepayment);

        // Update state with projections
        setFinancialProjections({
            monthlyData,
            summary: {
                totalRevenue: Math.round(totalRevenue),
                totalProfit: Math.round(totalProfit),
                totalRepayment: Math.round(totalRepayment),
                repaymentPeriod,
                roi: roi.toFixed(2),
                averageMonthlyPayment: totalRepayment > 0 ?
                    Math.round(totalRepayment / (repaymentComplete ? repaymentPeriod : projectionPeriod)) : 0
            }
        });

        // Check if model is ready
        validateModel();
    };

    const validateModel = () => {
        // Basic validation to check if essential fields are filled
        const isValid =
            businessDetails.businessName.trim() !== '' &&
            businessDetails.industry !== '' &&
            businessDetails.currentRevenue > 0 &&
            businessDetails.fundingNeeded > 0;

        setIsModelReady(isValid);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusinessDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumberChange = (name, value) => {
        setBusinessDetails(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleSaveModel = () => {
        toast({
            title: "Financial model saved",
            description: "Your revenue-based financial model has been saved successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        // Here you would handle the actual saving to your backend
    };

    const handleGenerateReport = () => {
        onReportOpen();
    };

    const handleDocumentVerificationComplete = (isComplete) => {
        setDocumentVerificationComplete(isComplete);
        toast({
            title: "Document verification complete",
            description: "All required documents have been verified successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onDocUploadClose();
    };

    const handleDownloadReport = () => {
        toast({
            title: "Report downloaded",
            description: "Your financial model report has been downloaded.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onReportClose();
    };

    const handleShareModel = () => {
        onShareOpen();
    };

    const handleSubmitModel = () => {
        if (!documentVerificationComplete) {
            onAlertOpen();
            return;
        }

        toast({
            title: "Financial model submitted",
            description: "Your revenue-based financial model has been submitted for review.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const goToStep = (step) => {
        setCurrentStep(step);
        setActiveStep(step);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                        <Heading size="md" mb={4}>Business Details</Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Business Name</FormLabel>
                                <Input
                                    name="businessName"
                                    value={businessDetails.businessName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your business name"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Industry</FormLabel>
                                <Select
                                    name="industry"
                                    value={businessDetails.industry}
                                    onChange={handleInputChange}
                                    placeholder="Select industry"
                                >
                                    <option value="technology">Technology</option>
                                    <option value="retail">Retail</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="services">Services</option>
                                    <option value="food">Food & Beverage</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="education">Education</option>
                                    <option value="agriculture">Agriculture</option>
                                    <option value="other">Other</option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>

                        <FormControl mt={4}>
                            <FormLabel>Business Stage</FormLabel>
                            <Select
                                name="businessStage"
                                value={businessDetails.businessStage}
                                onChange={handleInputChange}
                            >
                                <option value="idea">Idea/Concept</option>
                                <option value="early">Early Stage (Pre-revenue or &lt;1 year)</option>
                                <option value="growth">Growth Stage (1-3 years)</option>
                                <option value="established">Established (3+ years)</option>
                                <option value="expansion">Expansion/Scaling</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Business Description</FormLabel>
                            <Textarea
                                name="businessDescription"
                                placeholder="Briefly describe your business and its current operations"
                                rows={3}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <Button
                            mt={6}
                            colorScheme="blue"
                            onClick={() => goToStep(1)}
                            isDisabled={!businessDetails.businessName || !businessDetails.industry}
                        >
                            Next: Financial Inputs
                        </Button>
                    </Box>
                );
            case 1:
                return (
                    <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                        <Heading size="md" mb={4}>Financial Inputs</Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Current Revenue</FormLabel>
                                <NumberInput
                                    min={0}
                                    onChange={(value) => handleNumberChange('currentRevenue', value)}
                                    value={businessDetails.currentRevenue}
                                >
                                    <NumberInputField
                                        placeholder="Current revenue amount"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Revenue Frequency</FormLabel>
                                <Select
                                    name="revenueFrequency"
                                    value={businessDetails.revenueFrequency}
                                    onChange={handleInputChange}
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="annually">Annually</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Monthly Operating Costs</FormLabel>
                                <NumberInput
                                    min={0}
                                    onChange={(value) => handleNumberChange('operatingCosts', value)}
                                    value={businessDetails.operatingCosts}
                                >
                                    <NumberInputField
                                        placeholder="Fixed costs per month"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Expected Profit Margin (%)</FormLabel>
                                <NumberInput
                                    min={0}
                                    max={100}
                                    onChange={(value) => handleNumberChange('profitMargin', value)}
                                    value={businessDetails.profitMargin}
                                >
                                    <NumberInputField
                                        placeholder="Profit margin %"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </SimpleGrid>

                        <FormControl mt={4}>
                            <FormLabel>
                                Projected Annual Growth Rate (%)
                                <Tooltip label="Estimate how much your revenue will grow year-over-year" placement="top">
                                    <Icon as={FiInfo} ml={1} color="gray.500" />
                                </Tooltip>
                            </FormLabel>
                            <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={businessDetails.growthRate}
                                onChange={(value) => handleNumberChange('growthRate', value)}
                                mb={2}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack bg="teal.500" />
                                </SliderTrack>
                                <SliderThumb boxSize={6}>
                                    <Box color="teal.500" as={FiTrendingUp} />
                                </SliderThumb>
                            </Slider>
                            <Flex justify="space-between">
                                <Text fontSize="sm">{businessDetails.growthRate}% Annual Growth</Text>
                                <Text fontSize="sm">
                                    {(Math.pow(1 + (businessDetails.growthRate / 100), 1 / 12) - 1).toFixed(2)}% Monthly
                                </Text>
                            </Flex>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Projection Period (Months)</FormLabel>
                            <Select
                                name="projectionPeriod"
                                value={businessDetails.projectionPeriod}
                                onChange={handleInputChange}
                            >
                                <option value="12">12 months (1 year)</option>
                                <option value="24">24 months (2 years)</option>
                                <option value="36">36 months (3 years)</option>
                                <option value="48">48 months (4 years)</option>
                                <option value="60">60 months (5 years)</option>
                            </Select>
                        </FormControl>

                        <HStack mt={6} spacing={4}>
                            <Button colorScheme="gray" onClick={() => goToStep(0)}>
                                Previous
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => goToStep(2)}
                                isDisabled={businessDetails.currentRevenue <= 0}
                            >
                                Next: Funding Details
                            </Button>
                        </HStack>
                    </Box>
                );
            case 2:
                return (
                    <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                        <Heading size="md" mb={4}>Funding Details</Heading>

                        <FormControl isRequired>
                            <FormLabel>Funding Needed</FormLabel>
                            <NumberInput
                                min={0}
                                onChange={(value) => handleNumberChange('fundingNeeded', value)}
                                value={businessDetails.fundingNeeded}
                            >
                                <NumberInputField
                                    placeholder="Amount required"
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                            <FormControl>
                                <FormLabel>
                                    Revenue Share Percentage (%)
                                    <Tooltip label="Percentage of monthly revenue that will go towards repayment" placement="top">
                                        <Icon as={FiInfo} ml={1} color="gray.500" />
                                    </Tooltip>
                                </FormLabel>
                                <NumberInput
                                    min={1}
                                    max={20}
                                    onChange={(value) => handleNumberChange('paybackPercentage', value)}
                                    value={businessDetails.paybackPercentage}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>

                            <FormControl>
                                <FormLabel>
                                    Repayment Cap Multiplier
                                    <Tooltip label="Total repayment as a multiple of the original funding amount" placement="top">
                                        <Icon as={FiInfo} ml={1} color="gray.500" />
                                    </Tooltip>
                                </FormLabel>
                                <NumberInput
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onChange={(value) => handleNumberChange('paybackCap', value)}
                                    value={businessDetails.paybackCap}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </SimpleGrid>

                        <FormControl mt={4}>
                            <FormLabel>Funding Purpose</FormLabel>
                            <Textarea
                                name="fundingPurpose"
                                placeholder="Describe how you plan to use the funding"
                                rows={3}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <HStack mt={6} spacing={4}>
                            <Button colorScheme="gray" onClick={() => goToStep(1)}>
                                Previous
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    generateProjections();
                                    goToStep(3);
                                }}
                                isDisabled={businessDetails.fundingNeeded <= 0}
                            >
                                Next: Document Verification
                            </Button>
                        </HStack>
                    </Box>
                );
            case 3:
                return (
                    <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                        <Heading size="md" mb={4}>Document Verification</Heading>

                        <Text mb={4}>
                            To complete your funding application, please upload the following required documents:
                        </Text>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            {requiredDocuments.map((doc) => (
                                <Box key={doc.type} p={4} borderWidth="1px" borderRadius="md">
                                    <HStack>
                                        <Icon as={FiFilePlus} />
                                        <Text fontWeight="medium">{doc.name}</Text>
                                    </HStack>
                                    <Text fontSize="sm" color="gray.600" mt={1}>
                                        {doc.description}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>

                        <HStack mt={6} spacing={4}>
                            <Button colorScheme="gray" onClick={() => goToStep(2)}>
                                Previous
                            </Button>
                            <Button
                                colorScheme="blue"
                                leftIcon={<FiUpload />}
                                onClick={onDocUploadOpen}
                            >
                                Upload Documents
                            </Button>
                            <Button
                                colorScheme="teal"
                                onClick={() => goToStep(4)}
                                isDisabled={!documentVerificationComplete}
                            >
                                Next: Review & Finalize
                            </Button>
                        </HStack>
                    </Box>
                );
            case 4:
                return (
                    <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                        <Heading size="md" mb={4}>Review & Finalize</Heading>

                        {financialProjections.monthlyData.length > 0 ? (
                            <VStack spacing={4} align="stretch">
                                <Box p={4} borderWidth="1px" borderRadius="md">
                                    <Heading size="sm" mb={2}>Business Summary</Heading>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                        <Box>
                                            <Text fontWeight="bold">Business Name:</Text>
                                            <Text>{businessDetails.businessName}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Industry:</Text>
                                            <Text>{businessDetails.industry}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Business Stage:</Text>
                                            <Text>{businessDetails.businessStage}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Current Revenue:</Text>
                                            <Text>{formatCurrency(businessDetails.currentRevenue)} ({businessDetails.revenueFrequency})</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>

                                <Box p={4} borderWidth="1px" borderRadius="md">
                                    <Heading size="sm" mb={2}>Funding Details</Heading>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                        <Box>
                                            <Text fontWeight="bold">Funding Amount:</Text>
                                            <Text>{formatCurrency(businessDetails.fundingNeeded)}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Revenue Share:</Text>
                                            <Text>{businessDetails.paybackPercentage}% of monthly revenue</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Repayment Cap:</Text>
                                            <Text>{businessDetails.paybackCap}x ({formatCurrency(businessDetails.fundingNeeded * businessDetails.paybackCap)})</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Estimated Repayment Period:</Text>
                                            <Text>{financialProjections.summary.repaymentPeriod} months</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>

                                <Box p={4} borderWidth="1px" borderRadius="md">
                                    <Heading size="sm" mb={2}>Financial Projections Summary</Heading>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                        <Box>
                                            <Text fontWeight="bold">Total Projected Revenue:</Text>
                                            <Text>{formatCurrency(financialProjections.summary.totalRevenue)}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Total Profit (After Repayment):</Text>
                                            <Text>{formatCurrency(financialProjections.summary.totalProfit)}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Average Monthly Payment:</Text>
                                            <Text>{formatCurrency(financialProjections.summary.averageMonthlyPayment)}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">Investor ROI:</Text>
                                            <Text>{financialProjections.summary.roi}%</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>

                                <Box p={4} borderWidth="1px" borderRadius="md">
                                    <Heading size="sm" mb={2}>Document Verification Status</Heading>
                                    <HStack>
                                        <Icon
                                            as={documentVerificationComplete ? FiCheckCircle : FiAlertCircle}
                                            color={documentVerificationComplete ? "green.500" : "orange.500"}
                                        />
                                        <Text>
                                            {documentVerificationComplete
                                                ? "All documents verified successfully"
                                                : "Document verification incomplete"}
                                        </Text>
                                    </HStack>
                                </Box>

                                <HStack mt={4} spacing={4}>
                                    <Button colorScheme="gray" onClick={() => goToStep(3)}>
                                        Previous
                                    </Button>
                                    <Button
                                        colorScheme="teal"
                                        leftIcon={<FiSave />}
                                        onClick={handleSaveModel}
                                    >
                                        Save Model
                                    </Button>
                                    <Button
                                        colorScheme="blue"
                                        leftIcon={<FiShare2 />}
                                        onClick={handleShareModel}
                                    >
                                        Share Model
                                    </Button>
                                    <Button
                                        colorScheme="green"
                                        leftIcon={<FiCheckCircle />}
                                        onClick={handleSubmitModel}
                                        isDisabled={!documentVerificationComplete}
                                    >
                                        Submit for Funding
                                    </Button>
                                </HStack>
                            </VStack>
                        ) : (
                            <Box textAlign="center" py={10}>
                                <Icon as={FiAlertCircle} boxSize={10} color="orange.500" mb={4} />
                                <Heading size="md" mb={2}>No Projections Available</Heading>
                                <Text>
                                    Please go back to the previous steps to complete your business and funding details.
                                </Text>
                                <Button mt={6} colorScheme="blue" onClick={() => goToStep(0)}>
                                    Start from beginning
                                </Button>
                            </Box>
                        )}
                    </Box>
                );
            default:
                return null;
        }
    };
    // Modal components for document upload, report generation, and sharing
    const RevenueBasedFinancialModel = () => {
        const toast = useToast();
        const bgColor = useColorModeValue('white', 'gray.700');
        const borderColor = useColorModeValue('gray.200', 'gray.600');

        // Financial model state
        const [businessDetails, setBusinessDetails] = useState({
            businessName: '',
            industry: '',
            businessStage: 'early',
            currentRevenue: 0,
            revenueFrequency: 'monthly',
            operatingCosts: 0,
            projectionPeriod: 36,
            growthRate: 15,
            profitMargin: 20,
            fundingNeeded: 0,
            paybackPercentage: 6,
            paybackCap: 1.8
        });

        // Calculated financial projections
        const [financialProjections, setFinancialProjections] = useState({
            monthlyData: [],
            summary: {
                totalRevenue: 0,
                totalProfit: 0,
                totalRepayment: 0,
                repaymentPeriod: 0,
                roi: 0,
                averageMonthlyPayment: 0
            }
        });

        // Model state and validation
        const [isModelReady, setIsModelReady] = useState(false);
        const [documentVerificationComplete, setDocumentVerificationComplete] = useState(false);
        const [currentStep, setCurrentStep] = useState(0);
        const { isOpen: isDocUploadOpen, onOpen: onDocUploadOpen, onClose: onDocUploadClose } = useDisclosure();
        const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
        const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();
        const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
        const cancelRef = React.useRef();

        // Required documents for verification
        const requiredDocuments = [
            {
                type: 'business_registration',
                name: 'Business Registration Certificate',
                description: 'Certificate of incorporation or business registration document',
                acceptedFormats: '.pdf,.jpg,.png'
            },
            {
                type: 'financial_statements',
                name: 'Financial Statements',
                description: 'Last 12 months of financial statements or bank statements',
                acceptedFormats: '.pdf,.xlsx,.csv'
            },
            {
                type: 'tax_returns',
                name: 'Tax Returns',
                description: 'Last fiscal year tax returns',
                acceptedFormats: '.pdf'
            },
            {
                type: 'revenue_proof',
                name: 'Revenue Proof',
                description: 'Documentation proving your current revenue claims',
                acceptedFormats: '.pdf,.xlsx,.csv'
            }
        ];

        // Steps for financial model completion
        const steps = [
            { title: 'Business Details', description: 'Enter your business information' },
            { title: 'Financial Inputs', description: 'Provide revenue and cost data' },
            { title: 'Funding Requirements', description: 'Set funding needs and terms' },
            { title: 'Document Verification', description: 'Upload required documents' },
            { title: 'Review & Finalize', description: 'Review and submit your model' }
        ];

        const { activeStep, setActiveStep } = useSteps({
            index: currentStep,
            count: steps.length,
        });

        // ROI calculation for investors
        const calculateROI = (investment, totalRepayment) => {
            return ((totalRepayment / investment) - 1) * 100;
        };

        // Generate financial projections based on inputs
        useEffect(() => {
            if (businessDetails.currentRevenue <= 0 || businessDetails.fundingNeeded <= 0) {
                return;
            }

            generateProjections();
        }, [businessDetails]);

        const generateProjections = () => {
            const {
                currentRevenue,
                revenueFrequency,
                growthRate,
                projectionPeriod,
                operatingCosts,
                profitMargin,
                fundingNeeded,
                paybackPercentage,
                paybackCap
            } = businessDetails;

            // Convert revenue to monthly if needed
            let monthlyRevenue = currentRevenue;
            if (revenueFrequency === 'annually') {
                monthlyRevenue = currentRevenue / 12;
            } else if (revenueFrequency === 'quarterly') {
                monthlyRevenue = currentRevenue / 3;
            }

            // Monthly growth rate
            const monthlyGrowthRate = Math.pow(1 + (growthRate / 100), 1 / 12) - 1;

            // Calculate monthly projections
            let monthlyData = [];
            let totalRevenue = 0;
            let totalProfit = 0;
            let totalRepayment = 0;
            let repaymentComplete = false;
            let repaymentPeriod = 0;

            // Maximum repayment (cap)
            const maxRepayment = fundingNeeded * paybackCap;

            for (let month = 1; month <= projectionPeriod; month++) {
                // Project revenue with compound growth
                const projectedRevenue = monthlyRevenue * Math.pow(1 + monthlyGrowthRate, month - 1);

                // Calculate monthly profit based on margin
                const monthlyProfit = projectedRevenue * (profitMargin / 100) - operatingCosts;

                // Calculate revenue share payment (if not yet reached repayment cap)
                let revenueSharePayment = 0;
                if (totalRepayment < maxRepayment && !repaymentComplete) {
                    revenueSharePayment = projectedRevenue * (paybackPercentage / 100);
                    totalRepayment += revenueSharePayment;

                    // Check if this month completes the repayment
                    if (totalRepayment >= maxRepayment) {
                        revenueSharePayment -= (totalRepayment - maxRepayment);
                        totalRepayment = maxRepayment;
                        repaymentComplete = true;
                        repaymentPeriod = month;
                    }
                }

                // Net profit after revenue share payment
                const netProfit = monthlyProfit - revenueSharePayment;

                // Add to totals
                totalRevenue += projectedRevenue;
                totalProfit += netProfit;

                // Add to monthly data array for charting
                monthlyData.push({
                    month,
                    revenue: Math.round(projectedRevenue),
                    profit: Math.round(monthlyProfit),
                    payment: Math.round(revenueSharePayment),
                    netProfit: Math.round(netProfit),
                    cumulativeRepayment: Math.round(totalRepayment)
                });

                // If we haven't determined repayment period yet and this is the last month
                if (!repaymentComplete && month === projectionPeriod) {
                    repaymentPeriod = projectionPeriod + '+';
                }
            }

            // Calculate ROI
            const roi = calculateROI(fundingNeeded, totalRepayment);

            // Update state with projections
            setFinancialProjections({
                monthlyData,
                summary: {
                    totalRevenue: Math.round(totalRevenue),
                    totalProfit: Math.round(totalProfit),
                    totalRepayment: Math.round(totalRepayment),
                    repaymentPeriod,
                    roi: roi.toFixed(2),
                    averageMonthlyPayment: totalRepayment > 0 ?
                        Math.round(totalRepayment / (repaymentComplete ? repaymentPeriod : projectionPeriod)) : 0
                }
            });

            // Check if model is ready
            validateModel();
        };

        const validateModel = () => {
            // Basic validation to check if essential fields are filled
            const isValid =
                businessDetails.businessName.trim() !== '' &&
                businessDetails.industry !== '' &&
                businessDetails.currentRevenue > 0 &&
                businessDetails.fundingNeeded > 0;

            setIsModelReady(isValid);
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setBusinessDetails(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleNumberChange = (name, value) => {
            setBusinessDetails(prev => ({
                ...prev,
                [name]: Number(value)
            }));
        };

        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(amount);
        };

        const handleSaveModel = () => {
            toast({
                title: "Financial model saved",
                description: "Your revenue-based financial model has been saved successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            // Here you would handle the actual saving to your backend
        };

        const handleGenerateReport = () => {
            onReportOpen();
        };

        const handleDocumentVerificationComplete = (isComplete) => {
            setDocumentVerificationComplete(isComplete);
            toast({
                title: "Document verification complete",
                description: "All required documents have been verified successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onDocUploadClose();
        };

        const handleDownloadReport = () => {
            toast({
                title: "Report downloaded",
                description: "Your financial model report has been downloaded.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onReportClose();
        };

        const handleShareModel = () => {
            onShareOpen();
        };

        const handleSubmitModel = () => {
            if (!documentVerificationComplete) {
                onAlertOpen();
                return;
            }

            toast({
                title: "Financial model submitted",
                description: "Your revenue-based financial model has been submitted for review.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        };

        const goToStep = (step) => {
            setCurrentStep(step);
            setActiveStep(step);
        };

        const renderStepContent = () => {
            switch (currentStep) {
                case 0:
                    return (
                        <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                            <Heading size="md" mb={4}>Business Details</Heading>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Business Name</FormLabel>
                                    <Input
                                        name="businessName"
                                        value={businessDetails.businessName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your business name"
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Industry</FormLabel>
                                    <Select
                                        name="industry"
                                        value={businessDetails.industry}
                                        onChange={handleInputChange}
                                        placeholder="Select industry"
                                    >
                                        <option value="technology">Technology</option>
                                        <option value="retail">Retail</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="services">Services</option>
                                        <option value="food">Food & Beverage</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="education">Education</option>
                                        <option value="agriculture">Agriculture</option>
                                        <option value="other">Other</option>
                                    </Select>
                                </FormControl>
                            </SimpleGrid>

                            <FormControl mt={4}>
                                <FormLabel>Business Stage</FormLabel>
                                <Select
                                    name="businessStage"
                                    value={businessDetails.businessStage}
                                    onChange={handleInputChange}
                                >
                                    <option value="idea">Idea/Concept</option>
                                    <option value="early">Early Stage (Pre-revenue or &lt;1 year)</option>
                                    <option value="growth">Growth Stage (1-3 years)</option>
                                    <option value="established">Established (3+ years)</option>
                                    <option value="expansion">Expansion/Scaling</option>
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Business Description</FormLabel>
                                <Textarea
                                    name="businessDescription"
                                    placeholder="Briefly describe your business and its current operations"
                                    rows={3}
                                    onChange={handleInputChange}
                                />
                            </FormControl>

                            <Button
                                mt={6}
                                colorScheme="blue"
                                onClick={() => goToStep(1)}
                                isDisabled={!businessDetails.businessName || !businessDetails.industry}
                            >
                                Next: Financial Inputs
                            </Button>
                        </Box>
                    );
                case 1:
                    return (
                        <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                            <Heading size="md" mb={4}>Financial Inputs</Heading>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Current Revenue</FormLabel>
                                    <NumberInput
                                        min={0}
                                        onChange={(value) => handleNumberChange('currentRevenue', value)}
                                        value={businessDetails.currentRevenue}
                                    >
                                        <NumberInputField
                                            placeholder="Current revenue amount"
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Revenue Frequency</FormLabel>
                                    <Select
                                        name="revenueFrequency"
                                        value={businessDetails.revenueFrequency}
                                        onChange={handleInputChange}
                                    >
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                        <option value="annually">Annually</option>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Monthly Operating Costs</FormLabel>
                                    <NumberInput
                                        min={0}
                                        onChange={(value) => handleNumberChange('operatingCosts', value)}
                                        value={businessDetails.operatingCosts}
                                    >
                                        <NumberInputField
                                            placeholder="Fixed costs per month"
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Expected Profit Margin (%)</FormLabel>
                                    <NumberInput
                                        min={0}
                                        max={100}
                                        onChange={(value) => handleNumberChange('profitMargin', value)}
                                        value={businessDetails.profitMargin}
                                    >
                                        <NumberInputField
                                            placeholder="Profit margin %"
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </SimpleGrid>

                            <FormControl mt={4}>
                                <FormLabel>
                                    Projected Annual Growth Rate (%)
                                    <Tooltip label="Estimate how much your revenue will grow year-over-year" placement="top">
                                        <Icon as={FiInfo} ml={1} color="gray.500" />
                                    </Tooltip>
                                </FormLabel>
                                <Slider
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={businessDetails.growthRate}
                                    onChange={(value) => handleNumberChange('growthRate', value)}
                                    mb={2}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack bg="teal.500" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6}>
                                        <Box color="teal.500" as={FiTrendingUp} />
                                    </SliderThumb>
                                </Slider>
                                <Flex justify="space-between">
                                    <Text fontSize="sm">{businessDetails.growthRate}% Annual Growth</Text>
                                    <Text fontSize="sm">
                                        {(Math.pow(1 + (businessDetails.growthRate / 100), 1 / 12) - 1).toFixed(2)}% Monthly
                                    </Text>
                                </Flex>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Projection Period (Months)</FormLabel>
                                <Select
                                    name="projectionPeriod"
                                    value={businessDetails.projectionPeriod}
                                    onChange={handleInputChange}
                                >
                                    <option value="12">12 months (1 year)</option>
                                    <option value="24">24 months (2 years)</option>
                                    <option value="36">36 months (3 years)</option>
                                    <option value="48">48 months (4 years)</option>
                                    <option value="60">60 months (5 years)</option>
                                </Select>
                            </FormControl>

                            <HStack mt={6} spacing={4}>
                                <Button colorScheme="gray" onClick={() => goToStep(0)}>
                                    Previous
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    onClick={() => goToStep(2)}
                                    isDisabled={businessDetails.currentRevenue <= 0}
                                >
                                    Next: Funding Details
                                </Button>
                            </HStack>
                        </Box>
                    );
                case 2:
                    return (
                        <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                            <Heading size="md" mb={4}>Funding Details</Heading>

                            <FormControl isRequired>
                                <FormLabel>Funding Needed</FormLabel>
                                <NumberInput
                                    min={0}
                                    onChange={(value) => handleNumberChange('fundingNeeded', value)}
                                    value={businessDetails.fundingNeeded}
                                >
                                    <NumberInputField
                                        placeholder="Amount required"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                                <FormControl>
                                    <FormLabel>
                                        Revenue Share Percentage (%)
                                        <Tooltip label="Percentage of monthly revenue that will go towards repayment" placement="top">
                                            <Icon as={FiInfo} ml={1} color="gray.500" />
                                        </Tooltip>
                                    </FormLabel>
                                    <NumberInput
                                        min={1}
                                        max={20}
                                        onChange={(value) => handleNumberChange('paybackPercentage', value)}
                                        value={businessDetails.paybackPercentage}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>
                                        Repayment Cap Multiplier
                                        <Tooltip label="Total repayment as a multiple of the original funding amount" placement="top">
                                            <Icon as={FiInfo} ml={1} color="gray.500" />
                                        </Tooltip>
                                    </FormLabel>
                                    <NumberInput
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        onChange={(value) => handleNumberChange('paybackCap', value)}
                                        value={businessDetails.paybackCap}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            </SimpleGrid>

                            <FormControl mt={4}>
                                <FormLabel>Funding Purpose</FormLabel>
                                <Textarea
                                    name="fundingPurpose"
                                    placeholder="Describe how you plan to use the funding"
                                    rows={3}
                                    onChange={handleInputChange}
                                />
                            </FormControl>

                            <HStack mt={6} spacing={4}>
                                <Button colorScheme="gray" onClick={() => goToStep(1)}>
                                    Previous
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    onClick={() => {
                                        generateProjections();
                                        goToStep(3);
                                    }}
                                    isDisabled={businessDetails.fundingNeeded <= 0}
                                >
                                    Next: Document Verification
                                </Button>
                            </HStack>
                        </Box>
                    );
                case 3:
                    return (
                        <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                            <Heading size="md" mb={4}>Document Verification</Heading>

                            <Text mb={4}>
                                To complete your funding application, please upload the following required documents:
                            </Text>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                {requiredDocuments.map((doc) => (
                                    <Box key={doc.type} p={4} borderWidth="1px" borderRadius="md">
                                        <HStack>
                                            <Icon as={FiFilePlus} />
                                            <Text fontWeight="medium">{doc.name}</Text>
                                        </HStack>
                                        <Text fontSize="sm" color="gray.600" mt={1}>
                                            {doc.description}
                                        </Text>
                                    </Box>
                                ))}
                            </SimpleGrid>

                            <HStack mt={6} spacing={4}>
                                <Button colorScheme="gray" onClick={() => goToStep(2)}>
                                    Previous
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    leftIcon={<FiUpload />}
                                    onClick={onDocUploadOpen}
                                >
                                    Upload Documents
                                </Button>
                                <Button
                                    colorScheme="teal"
                                    onClick={() => goToStep(4)}
                                    isDisabled={!documentVerificationComplete}
                                >
                                    Next: Review & Finalize
                                </Button>
                            </HStack>
                        </Box>
                    );
                case 4:
                    return (
                        <Box p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                            <Heading size="md" mb={4}>Review & Finalize</Heading>

                            {financialProjections.monthlyData.length > 0 ? (
                                <VStack spacing={4} align="stretch">
                                    <Box p={4} borderWidth="1px" borderRadius="md">
                                        <Heading size="sm" mb={2}>Business Summary</Heading>
                                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                            <Box>
                                                <Text fontWeight="bold">Business Name:</Text>
                                                <Text>{businessDetails.businessName}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Industry:</Text>
                                                <Text>{businessDetails.industry}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Business Stage:</Text>
                                                <Text>{businessDetails.businessStage}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Current Revenue:</Text>
                                                <Text>{formatCurrency(businessDetails.currentRevenue)} ({businessDetails.revenueFrequency})</Text>
                                            </Box>
                                        </SimpleGrid>
                                    </Box>

                                    <Box p={4} borderWidth="1px" borderRadius="md">
                                        <Heading size="sm" mb={2}>Funding Details</Heading>
                                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                            <Box>
                                                <Text fontWeight="bold">Funding Amount:</Text>
                                                <Text>{formatCurrency(businessDetails.fundingNeeded)}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Revenue Share:</Text>
                                                <Text>{businessDetails.paybackPercentage}% of monthly revenue</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Repayment Cap:</Text>
                                                <Text>{businessDetails.paybackCap}x ({formatCurrency(businessDetails.fundingNeeded * businessDetails.paybackCap)})</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Estimated Repayment Period:</Text>
                                                <Text>{financialProjections.summary.repaymentPeriod} months</Text>
                                            </Box>
                                        </SimpleGrid>
                                    </Box>

                                    <Box p={4} borderWidth="1px" borderRadius="md">
                                        <Heading size="sm" mb={2}>Financial Projections Summary</Heading>
                                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                            <Box>
                                                <Text fontWeight="bold">Total Projected Revenue:</Text>
                                                <Text>{formatCurrency(financialProjections.summary.totalRevenue)}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Total Profit (After Repayment):</Text>
                                                <Text>{formatCurrency(financialProjections.summary.totalProfit)}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Average Monthly Payment:</Text>
                                                <Text>{formatCurrency(financialProjections.summary.averageMonthlyPayment)}</Text>
                                            </Box>
                                            <Box>
                                                <Text fontWeight="bold">Investor ROI:</Text>
                                                <Text>{financialProjections.summary.roi}%</Text>
                                            </Box>
                                        </SimpleGrid>
                                    </Box>

                                    <Box p={4} borderWidth="1px" borderRadius="md">
                                        <Heading size="sm" mb={2}>Document Verification Status</Heading>
                                        <HStack>
                                            <Icon
                                                as={documentVerificationComplete ? FiCheckCircle : FiAlertCircle}
                                                color={documentVerificationComplete ? "green.500" : "orange.500"}
                                            />
                                            <Text>
                                                {documentVerificationComplete
                                                    ? "All documents verified successfully"
                                                    : "Document verification incomplete"}
                                            </Text>
                                        </HStack>
                                    </Box>

                                    <HStack mt={4} spacing={4}>
                                        <Button colorScheme="gray" onClick={() => goToStep(3)}>
                                            Previous
                                        </Button>
                                        <Button
                                            colorScheme="teal"
                                            leftIcon={<FiSave />}
                                            onClick={handleSaveModel}
                                        >
                                            Save Model
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            leftIcon={<FiShare2 />}
                                            onClick={handleShareModel}
                                        >
                                            Share Model
                                        </Button>
                                        <Button
                                            colorScheme="green"
                                            leftIcon={<FiCheckCircle />}
                                            onClick={handleSubmitModel}
                                            isDisabled={!documentVerificationComplete}
                                        >
                                            Submit for Funding
                                        </Button>
                                    </HStack>
                                </VStack>
                            ) : (
                                <Box textAlign="center" py={10}>
                                    <Icon as={FiAlertCircle} boxSize={10} color="orange.500" mb={4} />
                                    <Heading size="md" mb={2}>No Projections Available</Heading>
                                    <Text>
                                        Please go back to the previous steps to complete your business and funding details.
                                    </Text>
                                    <Button mt={6} colorScheme="blue" onClick={() => goToStep(0)}>
                                        Start from beginning
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    );
                default:
                    return null;
            }
        };

        // Now let's render the main component structure and add remaining modals
        return (
            <Container maxW="container.xl" py={8}>
                <Box mb={8}>
                    <Heading size="lg" mb={2}>Revenue-Based Financial Model</Heading>
                    <Text color="gray.600">
                        Create a financial projection based on your current revenue and growth projections to secure revenue-based financing.
                    </Text>
                </Box>

                {/* Stepper for navigation */}
                <Stepper index={activeStep} mb={8} size="sm">
                    {steps.map((step, index) => (
                        <Step key={index} onClick={() => index <= Math.max(currentStep, 1) && goToStep(index)}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<Icon as={FiCheckCircle} />}
                                    incomplete={index + 1}
                                    active={index + 1}
                                />
                            </StepIndicator>
                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

                {/* Current step content */}
                {renderStepContent()}

                {/* Financial Charts and Analysis (only shown after initial inputs) */}
                {financialProjections.monthlyData.length > 0 && (
                    <Box mt={8} p={6} borderWidth="1px" borderRadius="lg" bg={bgColor} shadow="md">
                        <Tabs isFitted colorScheme="blue">
                            <TabList>
                                <Tab>Revenue Projections</Tab>
                                <Tab>Profit Analysis</Tab>
                                <Tab>Repayment Schedule</Tab>
                                <Tab>Key Metrics</Tab>
                            </TabList>

                            <TabPanels>
                                {/* Revenue Projections Tab */}
                                <TabPanel>
                                    <VStack spacing={4} align="stretch">
                                        <Heading size="md" mb={2}>Projected Monthly Revenue</Heading>
                                        <Box width="100%" height="400px">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={financialProjections.monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" label={{ value: "Month", position: "insideBottomRight", offset: -5 }} />
                                                    <YAxis label={{ value: "Revenue (INR)", angle: -90, position: "insideLeft" }} />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                                                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </VStack>
                                </TabPanel>

                                {/* Profit Analysis Tab */}
                                <TabPanel>
                                    <VStack spacing={4} align="stretch">
                                        <Heading size="md" mb={2}>Profit Analysis</Heading>
                                        <Box width="100%" height="400px">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={financialProjections.monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" label={{ value: "Month", position: "insideBottomRight", offset: -5 }} />
                                                    <YAxis label={{ value: "Profit (INR)", angle: -90, position: "insideLeft" }} />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
                                                    <Bar dataKey="netProfit" fill="#8884d8" name="Net Profit" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </VStack>
                                </TabPanel>

                                {/* Repayment Schedule Tab */}
                                <TabPanel>
                                    <VStack spacing={4} align="stretch">
                                        <Heading size="md" mb={2}>Repayment Schedule</Heading>
                                        <Box width="100%" height="400px">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={financialProjections.monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" label={{ value: "Month", position: "insideBottomRight", offset: -5 }} />
                                                    <YAxis label={{ value: "Repayment (INR)", angle: -90, position: "insideLeft" }} />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Area type="monotone" dataKey="payment" stroke="#8884d8" fill="#8884d8" name="Monthly Payment" />
                                                    <Area type="monotone" dataKey="cumulativeRepayment" stroke="#82ca9d" fill="#82ca9d" name="Cumulative Repayment" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </VStack>
                                </TabPanel>

                                {/* Key Metrics Tab */}
                                <TabPanel>
                                    <VStack spacing={4} align="stretch">
                                        <Heading size="md" mb={2}>Key Metrics</Heading>
                                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                            <Box p={4} borderWidth="1px" borderRadius="md">
                                                <Text fontWeight="bold">Total Revenue:</Text>
                                                <Text>{formatCurrency(financialProjections.summary.totalRevenue)}</Text>
                                            </Box>
                                            <Box p={4} borderWidth="1px" borderRadius="md">
                                                <Text fontWeight="bold">Total Profit:</Text>
                                                <Text>{formatCurrency(financialProjections.summary.totalProfit)}</Text>
                                            </Box>
                                            <Box p={4} borderWidth="1px" borderRadius="md">
                                                <Text fontWeight="bold">Total Repayment:</Text>
                                                <Text>{formatCurrency(financialProjections.summary.totalRepayment)}</Text>
                                            </Box>
                                            <Box p={4} borderWidth="1px" borderRadius="md">
                                                <Text fontWeight="bold">Repayment Period:</Text>
                                                <Text>{financialProjections.summary.repaymentPeriod} months</Text>
                                            </Box>
                                            <Box p={4} borderWidth="1px" borderRadius="md">
                                                <Text fontWeight="bold">ROI:</Text>
                                                <Text>{financialProjections.summary.roi}%</Text>
                                            </Box>
                                            <Box p={4} borderWidth="1px" borderRadius="md">
                                                <Text fontWeight="bold">Average Monthly Payment:</Text>
                                                <Text>{formatCurrency(financialProjections.summary.averageMonthlyPayment)}</Text>
                                            </Box>
                                        </SimpleGrid>
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                )}
            </Container>
        );
    };
}

export default RevenueBasedFinancialModel;