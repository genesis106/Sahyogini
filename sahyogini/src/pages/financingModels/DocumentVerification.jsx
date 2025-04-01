import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext'; // Import the language context
import Crowdfunding from './Crowdfunding';
import RevenueFundingApplication from './RevenueBased';
import PeerToPeerLending from './PeerToPeerLending';

function DocumentVerification({ model }) {
  console.log("Current model prop:", model.name.en);
  const { language } = useLanguage(); // Get the current language from the context
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [verificationStatus, setVerificationStatus] = useState({});
  const [isUploading, setIsUploading] = useState({});
  const [showFundingComponent, setShowFundingComponent] = useState(false);

  // Content object with translations for English and Hindi
  const content = {
    en: {
      heading: 'Business Document Verification',
      subheading: 'Upload and verify all required documents to proceed with the funding process.',
      progressTitle: 'Verification Progress:',
      verified: '✓ Verified',
      upload: 'Upload',
      uploading: 'Uploading...',
      file: 'File:',
      successMessage: 'All documents are verified! You can now proceed with the funding process.',
      proceedButton: 'Proceed with securing payment for your business',
      invalidModel: 'Invalid funding type selected.',
      documents: [
        { type: 'business_registration', name: 'Business Registration Certificate', description: 'Official document proving business registration.' },
        { type: 'business_license', name: 'Business License', description: 'Legal license issued by local authorities.' },
        { type: 'tax_identification', name: 'Tax Identification Number (TIN/PAN)', description: 'Proof of tax compliance.' },
        { type: 'bank_statement', name: 'Bank Account Statement', description: 'Recent business bank account statement.' },
        { type: 'financial_statements', name: 'Financial Statements', description: 'Profit & Loss, Balance Sheet (last fiscal year).' },
        { type: 'id_proof', name: 'Owner/Director ID Proof', description: 'Passport, Driver’s License, or Aadhaar.' },
        { type: 'address_proof', name: 'Business Address Proof', description: 'Lease Agreement, Utility Bill, etc.' },
        { type: 'board_resolution', name: 'Board Resolution for Signatory', description: 'Applicable for companies with an authorized signatory.' },
        { type: 'industry_license', name: 'Industry-Specific License', description: 'E.g., FSSAI (Food), Drug License, Import/Export Code.' },
        { type: 'trade_license', name: 'Trade License', description: 'Permission for conducting business activities.' },
        { type: 'partnership_deed', name: 'Partnership Deed', description: 'Applicable for partnerships, outlining responsibilities.' },
      ],
    },
    hi: {
      heading: 'व्यवसाय दस्तावेज़ सत्यापन',
      subheading: 'फंडिंग प्रक्रिया जारी रखने के लिए सभी आवश्यक दस्तावेज़ अपलोड और सत्यापित करें।',
      progressTitle: 'सत्यापन प्रगति:',
      verified: '✓ सत्यापित',
      upload: 'अपलोड करें',
      uploading: 'अपलोड हो रहा है...',
      file: 'फ़ाइल:',
      successMessage: 'सभी दस्तावेज़ सत्यापित हो गए हैं! अब आप फंडिंग प्रक्रिया जारी रख सकते हैं।',
      proceedButton: 'अपने व्यवसाय के लिए भुगतान सुरक्षित करने के लिए आगे बढ़ें',
      invalidModel: 'चयनित फंडिंग प्रकार अमान्य है।',
      documents: [
        { type: 'business_registration', name: 'व्यवसाय पंजीकरण प्रमाणपत्र', description: 'व्यवसाय पंजीकरण साबित करने वाला आधिकारिक दस्तावेज़।' },
        { type: 'business_license', name: 'व्यवसाय लाइसेंस', description: 'स्थानीय अधिकारियों द्वारा जारी कानूनी लाइसेंस।' },
        { type: 'tax_identification', name: 'कर पहचान संख्या (TIN/PAN)', description: 'कर अनुपालन का प्रमाण।' },
        { type: 'bank_statement', name: 'बैंक खाता विवरण', description: 'हाल का व्यवसाय बैंक खाता विवरण।' },
        { type: 'financial_statements', name: 'वित्तीय विवरण', description: 'लाभ और हानि, बैलेंस शीट (पिछले वित्तीय वर्ष)।' },
        { type: 'id_proof', name: 'मालिक/निदेशक पहचान प्रमाण', description: 'पासपोर्ट, ड्राइविंग लाइसेंस, या आधार।' },
        { type: 'address_proof', name: 'व्यवसाय पता प्रमाण', description: 'लीज एग्रीमेंट, यूटिलिटी बिल, आदि।' },
        { type: 'board_resolution', name: 'प्राधिकृत हस्ताक्षरकर्ता के लिए बोर्ड प्रस्ताव', description: 'कंपनियों के लिए लागू।' },
        { type: 'industry_license', name: 'उद्योग-विशिष्ट लाइसेंस', description: 'जैसे, FSSAI (खाद्य), ड्रग लाइसेंस, आयात/निर्यात कोड।' },
        { type: 'trade_license', name: 'व्यापार लाइसेंस', description: 'व्यवसाय गतिविधियों के संचालन की अनुमति।' },
        { type: 'partnership_deed', name: 'साझेदारी विलेख', description: 'साझेदारी के लिए लागू।' },
      ],
    },
  };

  // Use the content for the current language
  const c = content[language];

  const handleFileUpload = (docType) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading((prev) => ({ ...prev, [docType]: true }));

    setTimeout(() => {
      setUploadedDocs((prev) => ({ ...prev, [docType]: file.name }));
      setTimeout(() => {
        setVerificationStatus((prev) => ({ ...prev, [docType]: 'verified' }));
        setIsUploading((prev) => ({ ...prev, [docType]: false }));
        alert(`${docType} ${c.verified}`);
      }, 2000);
    }, 1500);
  };

  const progress = Math.round((Object.keys(verificationStatus).length / c.documents.length) * 100);
  const allDocumentsVerified = Object.keys(verificationStatus).length === c.documents.length;

  const handleProceed = () => {
    setShowFundingComponent(true);
  };

  if (showFundingComponent) {
    switch (model.name.en) {
      case 'Peer-to-Peer Lending':
        return <PeerToPeerLending />;
      case 'Crowdfunding':
        return <Crowdfunding />;
      case 'Revenue-Based Financing':
        return <RevenueFundingApplication />;
      default:
        return <p>{c.invalidModel}</p>;
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>{c.heading}</h1>
        <p style={styles.subheading}>{c.subheading}</p>
        <div style={styles.documentList}>
          {c.documents.map((doc) => (
            <div key={doc.type} style={styles.documentItem}>
              <div style={styles.documentHeader}>
                <div style={styles.documentInfo}>
                  <span style={styles.documentIcon}>📄</span>
                  <span style={styles.documentName}>{doc.name}</span>
                </div>
                {verificationStatus[doc.type] ? (
                  <span style={styles.verifiedBadge}>{c.verified}</span>
                ) : (
                  <button
                    style={styles.uploadButton}
                    onClick={() => document.getElementById(`file-${doc.type}`).click()}
                    disabled={isUploading[doc.type]}
                  >
                    {isUploading[doc.type] ? c.uploading : c.upload}
                  </button>
                )}
              </div>
              <p style={styles.documentDescription}>{doc.description}</p>
              {uploadedDocs[doc.type] && <p style={styles.fileName}>{c.file} {uploadedDocs[doc.type]}</p>}
              <input
                type="file"
                id={`file-${doc.type}`}
                onChange={handleFileUpload(doc.type)}
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
          ))}
        </div>
        <div style={styles.progressSection}>
          <p style={styles.progressTitle}>{c.progressTitle}</p>
          <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
          </div>
          <p style={styles.progressText}>
            {Object.keys(verificationStatus).length} of {c.documents.length} {language === 'en' ? 'documents verified' : 'दस्तावेज़ सत्यापित'}
          </p>
        </div>
        {allDocumentsVerified && (
          <>
            <p style={styles.successMessage}>{c.successMessage}</p>
            <button style={styles.proceedButton} onClick={handleProceed}>
              {c.proceedButton}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
    textAlign: "center",
  },
  subheading: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  documentList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  documentItem: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    transition: "box-shadow 0.3s, transform 0.3s",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  documentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  documentInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  documentIcon: {
    fontSize: "20px",
  },
  documentName: {
    fontWeight: "bold",
    color: "#333",
    fontSize: "16px",
  },
  documentDescription: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  uploadButton: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s, transform 0.2s",
  },
  verifiedBadge: {
    color: "#28a745",
    fontWeight: "bold",
    fontSize: "14px",
  },
  fileName: {
    fontStyle: "italic",
    color: "#555",
    fontSize: "14px",
  },
  progressSection: {
    marginTop: "30px",
    textAlign: "center",
  },
  progressTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  progressBarContainer: {
    height: "10px",
    background: "#eee",
    borderRadius: "5px",
    overflow: "hidden",
    marginTop: "5px",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  progressBar: {
    height: "100%",
    background: "#007bff",
    borderRadius: "5px",
    transition: "width 0.5s",
  },
  progressText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
  },
  successMessage: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "#28a745",
    fontSize: "16px",
    textAlign: "center",
  },
  proceedButton: {
    marginTop: "20px",
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s, transform 0.2s",
    width: "100%",
  },
};

export default DocumentVerification;