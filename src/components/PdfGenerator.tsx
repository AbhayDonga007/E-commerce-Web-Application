"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { Order } from "./OrderCard";

interface PdfGeneratorProps {
  order: Order;
  onSuccess: () => void;
  onError: () => void;
}

export function PdfGenerator({ order, onSuccess, onError }: PdfGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const [products, setProducts] = useState<any[]>([]);

  // Company details
  const companyDetails = {
    name: "Aavkar Fashion",
    address1: "G 31,32 Vinayak Aracad Opp Shrinidhi Res.",
    address2: "Sudama Chowk Surat 394101",
    mobile: "+91 9998264094",
    gstin: "24AAKFE5971A1ZM",
    pan: "AAKFE5971A",
    email: "aavkarfashion71@gmail.com",
    bank: "HDFC Bank,MOTA VARACHHA",
    ifsc: "HDFC0009213",
    account: "50200088248251",
  };

  // PDF Generation function
  const generatePdf = async () => {
    try {
      setIsGenerating(true);
      const { pdf, Document, Page, Text, View, Image, StyleSheet } =
        await import("@react-pdf/renderer");
      // Define styles
      const styles = StyleSheet.create({
        page: {
          padding: 30,
          fontSize: 10,
          fontFamily: "Times-Roman",
        },
        headerText: {
          position: "absolute",
          top: 20,
          left: 30,
          fontSize: 12,
          fontWeight: "700",
        },
        originalCopy: {
          position: "absolute",
          top: 20,
          // right: 30,
          fontSize: 10,
          padding: "3 8",
          border: "2 solid black",
        },
        tagline: {
          position: "absolute",
          top: 20,
          right: 30,
          fontSize: 12,
          fontWeight: "600",
        },
        header: {
          flexDirection: "row",
          marginTop: 30,
          marginBottom: 15,
          gap: 20,
        },
        logo: {
          width: 80,
          height: 80,
        },
        logo2: {
          width: 120,
          height: 30,
        },
        companyInfo: {
          flex: 1,
        },
        companyName: {
          fontFamily: "Times-Roman",
          fontWeight: "900",
          fontSize: 24,
          color: "#E6A817",
          marginBottom: 5,
        },
        divider: {
          borderBottom: "3 solid #E6A817",
          // marginVertical: 10,
        },
        invoiceDetails: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          padding: "8 4",
          backgroundColor: "#e0e0e0",
        },
        addressSection: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        },
        addressBox: {
          width: "48%",
        },
        sectionTitle: {
          fontSize: 11,
          fontWeight: "700",
          marginBottom: 5,
        },
        table: {
          marginTop: 10,
        },
        tableHeader: {
          flexDirection: "row",
          backgroundColor: "#f5f5f5",
          borderBottom: "1 solid black",
          borderTop: "1 solid black",
          padding: "8 4",
        },
        tableRow: {
          flexDirection: "row",
          borderBottom: "1 solid #ddd",
          padding: "8 4",
        },
        itemCol: { width: "30%" },
        hsnCol: { width: "15%" },
        qtyCol: { width: "10%" },
        rateCol: { width: "15%" },
        taxCol: { width: "15%" },
        amountCol: { width: "15%" },
        cell: {
          textAlign: "center",
        },
        totalsSection: {
          alignItems: "flex-end",
        },
        bankDetails: {
          marginTop: 30,
        },
        termsSection: {
          marginTop: 20,
        },
        footer: {
          position: "absolute",
          bottom: 30,
          right: 30,
          textAlign: "center",
        },
      });

      const InvoicePDF = (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>
              TAX INVOICE{" "}
              <Text style={styles.originalCopy}>ORIGINAL FOR RECIPIENT</Text>
            </Text>
            <Text style={styles.tagline}>your trust is your profit</Text>

            {/* Header */}
            <View style={styles.header}>
              <Image src="/images/Aavkar3.png" style={styles.logo} />

              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{companyDetails.name}</Text>
                <Text>{companyDetails.address1}</Text>
                <Text>{companyDetails.address2}</Text>
                <Text>
                  Mobile: {companyDetails.mobile} GSTIN: {companyDetails.gstin}{" "}
                  PAN Number: {companyDetails.pan}
                </Text>
                <Text>Email: {companyDetails.email}</Text>
              </View>
              <Image src="/images/Eroe2.png" style={styles.logo2} />
            </View>

            <View style={styles.divider} />

            {/* Invoice Info */}
            <View style={styles.invoiceDetails}>
              <Text>Invoice No.: {order._id}</Text>
              <Text>Invoice Date: 17/12/2025</Text>
              <Text>Due Date: 19/03/2025</Text>
              {/* <Text>Invoice No.: {order.id}</Text>
              <Text>Invoice Date: {order.date}</Text>
              <Text>Due Date: {order.dueDate}</Text> */}
            </View>

            {/* Bill To / Ship To */}
            <View style={styles.addressSection}>
              <View style={styles.addressBox}>
                <Text style={styles.sectionTitle}>BILL TO</Text>
                <Text>{order.customerName}</Text>
                <Text>{order.shippingAddress}</Text>
                <Text>Mobile: {order.customerPhone}</Text>
                <Text>Email: {order.customerEmail}</Text>
                {/* <Text>PAN No: {order.}</Text>
                <Text>State: Gujarat</Text> */}
                {/* <Text>{order.customerName}</Text>
                <Text>{order.customerAddress}</Text>
                <Text>Mobile: {order.customerMobile}</Text>
                <Text>GSTIN: {order.customerGST}</Text>
                <Text>State: {order.customerState}</Text> */}
              </View>
              <View style={styles.addressBox}>
                <Text style={styles.sectionTitle}>SHIP TO</Text>
                <Text>Abhay Donga</Text>
                <Text>{order.customerName}</Text>
                <Text>{order.shippingAddress}</Text>
                <Text>Mobile: {order.customerPhone}</Text>
                <Text>Email: {order.customerEmail}</Text>
                {/* <Text>{order.customerName}</Text>
                <Text>{order.customerAddress}</Text>
                <Text>Mobile: {order.customerMobile}</Text>
                <Text>GSTIN: {order.customerGST}</Text>
                <Text>State: {order.customerState}</Text> */}
              </View>
            </View>

            {/* Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.cell, styles.itemCol]}>Product Id</Text>
                <Text style={[styles.cell, styles.hsnCol]}>Color</Text>
                <Text style={[styles.cell, styles.qtyCol]}>QTY.</Text>
                <Text style={[styles.cell, styles.rateCol]}>Size</Text>
                <Text style={[styles.cell, styles.taxCol]}>Tax</Text>
                <Text style={[styles.cell, styles.amountCol]}>Amount</Text>
              </View>

              {order.products.map((product: any, index: number) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.cell, styles.itemCol]}>
                    {product.productId}
                  </Text>
                  <Text style={[styles.cell, styles.hsnCol]}>{product.productColor}</Text>
                  <Text style={[styles.cell, styles.qtyCol]}>{product.quantity} PCS</Text>
                  <Text style={[styles.cell, styles.rateCol]}>
                    {product.productSize}
                  </Text>
                  <Text style={[styles.cell, styles.taxCol]}>Rs. 1650</Text>
                  <Text style={[styles.cell, styles.amountCol]}>
                    Rs. 15400
                  </Text>
                  {/* <Text style={[styles.cell, styles.itemCol]}>{product.name}</Text>
                  <Text style={[styles.cell, styles.hsnCol]}>{product.hsn}</Text>
                  <Text style={[styles.cell, styles.qtyCol]}>{product.qty} PCS</Text>
                  <Text style={[styles.cell, styles.rateCol]}>₹ {product.rate}</Text>
                  <Text style={[styles.cell, styles.taxCol]}>₹ {product.tax}</Text>
                  <Text style={[styles.cell, styles.amountCol]}>₹ {product.amount}</Text> */}
                </View>
              ))}
            </View>

            {/* Totals */}
            <View style={styles.divider} />
            <View style={styles.totalsSection}>
              <Text>SUBTOTAL: Rs. 25000</Text>
              <Text>CGST @6%: Rs. 1500</Text>
              <Text>SGST @6%: Rs. 1500</Text>
              <Text>TOTAL AMOUNT: Rs. 25000</Text>
              <Text>Received Amount: Rs. {order.orderPrice || 0}</Text>
              {/* <Text>SUBTOTAL: ₹ {order.subtotal}</Text>
              <Text>CGST @6%: ₹ {order.cgst}</Text>
              <Text>SGST @6%: ₹ {order.sgst}</Text>
              <Text>TOTAL AMOUNT: ₹ {order.total}</Text>
              <Text>Received Amount: ₹ {order.received || 0}</Text> */}
            </View>
            <View style={styles.divider} />

            {/* Bank Details */}
            <View style={styles.bankDetails}>
              <Text style={styles.sectionTitle}>BANK DETAILS</Text>
              <Text>Name: {companyDetails.name}</Text>
              <Text>IFSC Code: {companyDetails.ifsc}</Text>
              <Text>Account No: {companyDetails.account}</Text>
              <Text>Bank: {companyDetails.bank}</Text>
            </View>

            {/* Terms */}
            <View style={styles.termsSection}>
              <Text style={styles.sectionTitle}>TERMS AND CONDITIONS</Text>
              <Text>
                1. Payment should be made by NEFT/RTGS/ cheque wire transfer
                only.
              </Text>
              <Text>
                2. no GR will be accepted any quality concern must be raised
                within 24 hours after receiving goods after that no complaint
                will be entertained.
              </Text>
              <Text>
                3. penalty & interest 24% per annual will be changed after the
                due date.
              </Text>
              <Text>
                4. we are not responsible for any loss /demage during transit or
                logistics.
              </Text>
              <Text>
                5. logistics costs all costs transportation and delivery are to
                be paid by the customer/buyer.
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text>AUTHORISED SIGNATORY FOR</Text>
              <Text>{companyDetails.name}</Text>
            </View>
          </Page>
        </Document>
      );

      const blob = await pdf(InvoicePDF).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${order._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onSuccess();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      onError();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={generatePdf}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isGenerating ? "Generating..." : "Download Invoice"}
    </Button>
  );
}
