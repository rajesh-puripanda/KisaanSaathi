import React, { createContext, useContext, useState, useEffect } from 'react';
import { FARMERS } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // 'farmer' | 'officer'
  const [user, setUser] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Initialize with saved session or null
  useEffect(() => {
    const saved = localStorage.getItem('krishi_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRole(parsed.role);
        setUser(parsed.user);
      } catch (e) {
        console.error('Failed to parse auth token', e);
      }
    }
  }, []);

  const loginFarmer = (farmerData) => {
    // Check if farmer exists in database or create profile
    let matched = FARMERS.find(f => 
      f.aadhaar.replace(/\s+/g, '') === farmerData.aadhaar.replace(/\s+/g, '') ||
      f.mobile === farmerData.mobile
    );

    if (!matched) {
      matched = {
        id: Date.now(),
        name: farmerData.name || "Kisan Sathi",
        mobile: farmerData.mobile,
        aadhaar: farmerData.aadhaar,
        village: farmerData.village || "Balipatna Block",
        district: "Khurda",
        crop: "Tomato",
        score: 68,
        rainfallDeficit: 32,
        priceDrop: 35,
        loanDueDays: 6,
        loans: [
          { id: "L-NEW-1", name: "KCC Crop Loan", amount: 40000, dueDays: 6, rate: "4%", status: "Critical" }
        ],
        acres: 2.0,
        appliedSchemes: [
          {
            id: "app-pmfby-new",
            schemeId: "pmfby",
            schemeName: "PM Fasal Bima Yojana (PMFBY)",
            appliedDate: "15 Aug 2024",
            applicationNo: "PMFBY-OD-2024-" + Math.floor(10000 + Math.random() * 90000),
            category: "Crop Insurance",
            status: "Application Submitted",
            statusStep: 1,
            statusMessage: "Application registered at CSC VLE. Awaiting bank verification.",
            claimAmount: "₹18,000 (Drought Deficit Loss Claim)",
            disbursedAmount: null,
            bankAccount: "Primary Agricultural Cooperative (A/C: ...9912)",
            documentChecklist: ["Aadhaar Copy ✓", "Self Declaration ✓"]
          }
        ],
        rentedMachines: []
      };
    }

    setRole('farmer');
    setUser(matched);
    setShowLanguageModal(true); // Ask for preferred language right after login!
    localStorage.setItem('krishi_auth', JSON.stringify({ role: 'farmer', user: matched }));
  };

  const applyToScheme = (scheme) => {
    if (!user) return;
    const newApp = {
      id: "app-" + scheme.id + "-" + Date.now(),
      schemeId: scheme.id,
      schemeName: scheme.name,
      appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      applicationNo: `${scheme.id.toUpperCase()}-OD-2024-${Math.floor(10000 + Math.random() * 90000)}`,
      category: scheme.category,
      status: "Application Submitted",
      statusStep: 1,
      statusMessage: "Submitted online via Krishi Sahayak. Verification by Block Agronomist underway.",
      claimAmount: scheme.benefitAmount || scheme.subsidy,
      disbursedAmount: null,
      bankAccount: "Aadhaar DBT Linked Bank (A/C: ...4109)",
      documentChecklist: (scheme.documentsRequired || ["Aadhaar Card", "Land Record (RoR)"]).map(d => `${d} ✓`)
    };

    const updatedSchemes = [newApp, ...(user.appliedSchemes || [])];
    const updatedUser = { ...user, appliedSchemes: updatedSchemes };
    setUser(updatedUser);
    localStorage.setItem('krishi_auth', JSON.stringify({ role, user: updatedUser }));
    return newApp;
  };

  const bookMachinery = (bookedList) => {
    if (!user) return;
    const newBookings = bookedList.map(item => ({
      bookingId: "BK-" + Math.floor(1000 + Math.random() * 9000),
      machineId: item.machine.id,
      name: item.machine.name,
      bookedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      scheduledDate: new Date(Date.now() + 86400000 * 2).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      durationDays: item.durationDays,
      totalCost: item.machine.pricePerDay * item.durationDays,
      provider: item.machine.owner,
      phone: item.machine.phone,
      status: "Confirmed & Driver Assigned",
      lossAnalysis: item.machine.pricePerDay <= 1000 ? "Highly Suggestable (Cost Saver)" : "Suggestable for Farm Plot"
    }));

    const updatedRented = [...newBookings, ...(user.rentedMachines || [])];
    const updatedUser = { ...user, rentedMachines: updatedRented };
    setUser(updatedUser);
    localStorage.setItem('krishi_auth', JSON.stringify({ role, user: updatedUser }));
    return newBookings;
  };

  const loginOfficer = (officerData) => {
    const officerProfile = {
      id: officerData.officerId || "AGRI-OFF-704",
      name: officerData.name || "Dr. S. K. Mohapatra",
      district: officerData.district || "Khurda District (Odisha)",
      designation: officerData.designation || "District Agriculture Officer (DAO)",
      phone: "0674-2391000",
      jurisdictionVillages: ["Balipatna", "Khurda", "Tangi", "Chilika", "Jatni", "Begunia", "Banapur"]
    };

    setRole('officer');
    setUser(officerProfile);
    setShowLanguageModal(true);
    localStorage.setItem('krishi_auth', JSON.stringify({ role: 'officer', user: officerProfile }));
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    setShowLanguageModal(false);
    localStorage.removeItem('krishi_auth');
  };

  return (
    <AuthContext.Provider value={{
      role,
      user,
      setRole,
      setUser,
      loginFarmer,
      loginOfficer,
      logout,
      applyToScheme,
      bookMachinery,
      showLanguageModal,
      setShowLanguageModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

