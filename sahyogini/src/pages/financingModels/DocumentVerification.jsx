import React, { useState } from 'react';
import Crowdfunding from './Crowdfunding';
import RevenueFundingApplication from './RevenueBased';
import PeerToPeerLending from './PeerToPeerLending';

function DocumentVerification({ model }) {
  // Debug the model prop
  console.log("Current model prop:", model);

  const [uploadedDocs, setUploadedDocs] = useState({});
  const [verificationStatus, setVerificationStatus] = useState({});
  const [isUploading, setIsUploading] = useState({});
  const [showFundingComponent, setShowFundingComponent] = useState(false); // State to show the funding component

  const requiredDocuments = [
    { type: 'business_registration', name: 'Business Registration Certificate', description: 'Official document proving business registration.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'business_license', name: 'Business License', description: 'Legal license issued by local authorities.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'tax_identification', name: 'Tax Identification Number (TIN/PAN)', description: 'Proof of tax compliance.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'bank_statement', name: 'Bank Account Statement', description: 'Recent business bank account statement.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'financial_statements', name: 'Financial Statements', description: 'Profit & Loss, Balance Sheet (last fiscal year).', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'id_proof', name: 'Owner/Director ID Proof', description: 'Passport, Driver\'s License, or Aadhaar.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'address_proof', name: 'Business Address Proof', description: 'Lease Agreement, Utility Bill, etc.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'board_resolution', name: 'Board Resolution for Signatory', description: 'Applicable for companies with an authorized signatory.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'industry_license', name: 'Industry-Specific License', description: 'E.g., FSSAI (Food), Drug License, Import/Export Code.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'trade_license', name: 'Trade License', description: 'Permission for conducting business activities.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' },
    { type: 'partnership_deed', name: 'Partnership Deed', description: 'Applicable for partnerships, outlining responsibilities.', acceptedFormats: '.jpg,.jpeg,.png,.pdf' }
  ];

  const handleFileUpload = (docType) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading((prev) => ({ ...prev, [docType]: true }));

    setTimeout(() => {
      setUploadedDocs((prev) => ({ ...prev, [docType]: file.name }));
      setTimeout(() => {
        setVerificationStatus((prev) => ({ ...prev, [docType]: 'verified' }));
        setIsUploading((prev) => ({ ...prev, [docType]: false }));
        // Fixed alert syntax with proper backticks
        alert(`${docType} has been successfully verified.`);
      }, 2000);
    }, 1500);
  };

  const progress = Math.round((Object.keys(verificationStatus).length / requiredDocuments.length) * 100);
  const allDocumentsVerified = Object.keys(verificationStatus).length === requiredDocuments.length;

  const handleProceed = () => {
    console.log("Proceeding with funding type:", model); // Debug log
    setShowFundingComponent(true); // Show the funding component
  };

  if (showFundingComponent) {
    console.log("Showing funding component for model:", model); // Debug log
    
    // Render the appropriate funding type component based on the model prop
    switch (model.name) {
      case 'Peer-to-Peer Lending':
        return <PeerToPeerLending />;
      case 'Crowdfunding':
        return <Crowdfunding />;
      case 'Revenue-Based Financing':
        return <RevenueFundingApplication />;
      default:
        return <p>Invalid funding type selected. Current model: {model || "undefined"}</p>;
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Business Document Verification</h1>
        <p style={styles.subheading}>Upload and verify all required documents to proceed with the funding process.</p>
        <div style={styles.documentList}>
          {requiredDocuments.map((doc) => (
            <div key={doc.type} style={styles.documentItem}>
              <div style={styles.documentHeader}>
                <div style={styles.documentInfo}>
                  <span style={styles.documentIcon}>📄</span>
                  <span style={styles.documentName}>{doc.name}</span>
                </div>
                {verificationStatus[doc.type] ? (
                  <span style={styles.verifiedBadge}>✓ Verified</span>
                ) : (
                  <button
                    style={styles.uploadButton}
                    onClick={() => document.getElementById(`file-${doc.type}`).click()}
                    disabled={isUploading[doc.type]}
                  >
                    {isUploading[doc.type] ? 'Uploading...' : 'Upload'}
                  </button>
                )}
              </div>
              <p style={styles.documentDescription}>{doc.description}</p>
              {uploadedDocs[doc.type] && <p style={styles.fileName}>File: {uploadedDocs[doc.type]}</p>}
              <input
                type="file"
                id={`file-${doc.type}`}
                onChange={handleFileUpload(doc.type)}
                style={{ display: 'none' }}
                accept={doc.acceptedFormats}
              />
            </div>
          ))}
        </div>
        <div style={styles.progressSection}>
          <p style={styles.progressTitle}>Verification Progress:</p>
          <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
          </div>
          <p style={styles.progressText}>
            {Object.keys(verificationStatus).length} of {requiredDocuments.length} documents verified
          </p>
        </div>
        {allDocumentsVerified && (
          <>
            <p style={styles.successMessage}>All documents are verified! You can now proceed with the funding process.</p>
            <button style={styles.proceedButton} onClick={handleProceed}>
              Proceed with securing payment for your business
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