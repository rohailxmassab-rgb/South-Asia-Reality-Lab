import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "manchai-6ce31",
  appId: "1:846798037168:web:79cb27a7a2d561094f1b75",
  apiKey: "AIzaSyAl8xLAX0583um01gCv_mJL2pLMxV_a0tI",
  authDomain: "manchai-6ce31.firebaseapp.com",
  storageBucket: "manchai-6ce31.firebasestorage.app",
  messagingSenderId: "846798037168"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Default database

const researchData = [
  {
    country: "Pakistan",
    sectors: {
      Education: {
        metrics: { literacy: "63%", male: "73%", female: "54%", budget_gdp: "0.8%", out_of_school: "28%" },
        bottlenecks: ["Chronic spending cuts", "Urban-rural divide", "Gender disparity"],
        recent_trends: ["Out-of-school drop to 28%", "Punjab rural female literacy growth"]
      },
      Healthcare: {
        metrics: { life_expectancy: "67.8y", immunization: "73%", neonatal_mortality: "35/1k", beds_per_100k: "67" },
        bottlenecks: ["Provincial budget skew", "Regional resource disparity", "Low overall spend"],
        recent_trends: ["Immunization up to 73%", "5.3% increase in registered doctors"]
      },
      Infrastructure: {
        metrics: { grid_efficiency: "81%", clean_water: "68%", paved_roads: "52%" },
        bottlenecks: ["Circular debt", "Climate vulnerability"],
        recent_trends: ["Provincial transport corridor focus"]
      },
      Economy: {
        metrics: { growth: "2.4%", inflation: "3.2%", debt_gdp: "71%" },
        bottlenecks: ["External loan reliance", "Inflation pressure"],
        recent_trends: ["Regulatory stabilization"]
      }
    }
  },
  {
    country: "India",
    sectors: {
      Education: {
        metrics: { primary_ger: "90.9%", secondary_ger: "78.7%", institutions: "70,018", digital_ids: "2.2cr" },
        bottlenecks: ["Tier-3 quality gaps", "Skill-industry mismatch"],
        recent_trends: ["NEP implementation", "IIT/IIM/AIIMS expansion"]
      },
      Healthcare: {
        metrics: { insurance_coverage: "55%", life_expectancy: "70.2y", public_spend_gdp: "2.2%" },
        bottlenecks: ["Out-of-pocket costs", "Urban concentration"],
        recent_trends: ["Digital Health Record rollout"]
      },
      Infrastructure: {
        metrics: { capex_gdp: "4.0%", highway_speed: "28km/day", dpi_penetration: "89%" },
        bottlenecks: ["Land acquisition delays", "Industrial carbon footprint"],
        recent_trends: ["State-level asset incentives"]
      },
      Economy: {
        metrics: { growth: "7.0%", fiscal_deficit: "4.4%", trade_status: "Services Surplus" },
        bottlenecks: ["Goods trade deficit", "Currency geopolitical exposure"],
        recent_trends: ["Strong corporate balance sheets"]
      }
    }
  },
  {
    country: "Sri Lanka",
    sectors: {
      Education: {
        metrics: { literacy: "92.5%", completion: "98%", fee_coverage: "100%" },
        bottlenecks: ["Curriculum misalignment", "Tech professional brain drain"],
        recent_trends: ["Public school computing modules"]
      },
      Healthcare: {
        metrics: { life_expectancy: "76.4y", utilization: "82%", maternal_mortality: "29/100k" },
        bottlenecks: ["Pharma import delays", "Rural budget squeeze"],
        recent_trends: ["Baseline storage recovery via aid"]
      },
      Infrastructure: {
        metrics: { port_growth: "11%", electrification: "99%", capex_gdp: "3.0%" },
        bottlenecks: ["Budget execution lag", "Foreign investment dependency"],
        recent_trends: ["Maritime deep-water revitalization"]
      },
      Economy: {
        metrics: { consumption_growth: "8.6%", credit_expansion: "25.2%", inflation: "-0.5%" },
        bottlenecks: ["Reserve rebuilding", "Low tax collection"],
        recent_trends: ["Macroeconomic consumption rebound"]
      }
    }
  },
  {
    country: "Nepal",
    sectors: {
      Education: {
        metrics: { youth_literacy: "88.6%", primary_enrollment: "96%", gender_parity: "1.01" },
        bottlenecks: ["Mountain dropout rates", "Equipment distribution accessibility"],
        recent_trends: ["Female scholarship success"]
      },
      Healthcare: {
        metrics: { life_expectancy: "71.3y", health_workers: "52k", u5_mortality: "28/1k" },
        bottlenecks: ["Urban doctor shortage", "Transit delays for emergencies"],
        recent_trends: ["Community-led immunization networks"]
      },
      Infrastructure: {
        metrics: { hydro_capacity: "2.8gw", road_paved: "44%", internet: "41%" },
        bottlenecks: ["Isolated grid integration", "Landslide road disruption"],
        recent_trends: ["Clean power exports to neighbors"]
      },
      Economy: {
        metrics: { growth: "3.8%", remittance_gdp: "24%", tourism_growth: "19%" },
        bottlenecks: ["Remittance sensitivity", "Import reliance"],
        recent_trends: ["Tourism rebound stabilizing trade"]
      }
    }
  }
];

async function seed() {
  console.log("Synchronizing (default) database...");
  const collectionRef = collection(db, "societal_data");

  for (const item of researchData) {
    for (const [sector, data] of Object.entries(item.sectors)) {
      console.log(`Syncing: ${item.country} >> ${sector}`);
      
      const q = query(collectionRef, where("country", "==", item.country), where("sector", "==", sector));
      const existing = await getDocs(q);
      for (const d of existing.docs) await deleteDoc(d.ref);

      await addDoc(collectionRef, {
        country: item.country,
        sector: sector,
        metrics: data.metrics,
        bottlenecks: data.bottlenecks,
        recent_trends: data.recent_trends,
        timestamp: new Date().toISOString(),
        node_status: "ACTIVE"
      });
    }
  }
  console.log("Database successfully populated.");
  process.exit(0);
}

seed().catch(err => {
  console.error("Sync Failure:", err);
  process.exit(1);
});
