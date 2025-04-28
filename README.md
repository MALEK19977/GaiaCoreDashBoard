# 🌱 GaiaCore: Agro-Food Sustainability Dashboard

![Power BI]
![PostgreSQL]
![Talend]
![ML]

**A Power BI-driven command center** for tracking CO₂ emissions, energy efficiency, and supply chain risks in the agro-food sector, powered by SAP MM/PM data.

## 📊 Key Features
- **Real-time CO₂ Heatmaps** by facility/supplier
- **Energy Waste Alerts** for high-consumption equipment
- **Predictive Maintenance** using SAP PM data
- **Supplier Sustainability Scoring** (carbon impact per material)

## 🛠️ Technical Stack
| Component       | Technology Used           |
|-----------------|--------------------------|
| **ETL**         | Talend (Staging Area → PostgreSQL) |
| **Data Warehouse** | PostgreSQL (Star Schema) |
| **Visualization** | Power BI (DirectQuery) |
| **Version Control** | Git LFS (for .pbix files) |

## 📂 Repository Structure
├── dashboards/ # Power BI files (.pbix)
├── Files/  
├── ML/  #Machine Learning part
├── Image/
├── scripts/
│ ├── DAX/ # Measure definitions
│ └── M/ # Power Query scripts
├── Conception/ # Project Datawherehouse conception 
│ └── Visual_CONCEPTION
│ └── Sus_DW # DatawherHouse .sql
│ └── Sus_SA # Stagging_Area .sql
├── .gitignore # Power BI temp file exclusion
└── README.md # You are here!


## 🚀 Getting Started
1. **Prerequisites**:
   - Power BI Desktop (Latest)
   - PostgreSQL 17.2 on x86-64-windows,64-bit
   - [Git LFS](https://git-lfs.com/) (for versioning .pbix)
   - Talend_Version: 8.0.1
      Visit http://www.talend.com

2. **First-Time Setup**:
   ```bash
   git clone https://github.com/MeMalek/DashBoard_BI_GaiaCore.git
   git lfs install
   git lfs pull
