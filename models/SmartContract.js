import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SmartContractSchema = new Schema(
    {
        chainName: {
            type: String,
            required: true,
            enum: ['Ethereum', 'Polygon', 'BSC'], // BSC stands for Binance Smart Chain
            default: 'Ethereum'
        },
        contractCode: {
            type: String,
            required: true
        },
        contractAddress: {
            type: String,
            required: true
        },
        auditStatus: {
            type: String,
            required: true,
            enum: ['Pending', 'In Progress', 'Completed', 'Failed'],
            default: 'Pending'
        },
        auditHistory: [{
            auditor: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            findings: String,
            recommendations: String
        }],
        securityLevel: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            required: true
        }
    },
    { 
        timestamps: { 
            createdAt: "created_at", 
            updatedAt: "updated_at" 
        }
    }
);

const SmartContract = mongoose.model("SmartContract", SmartContractSchema);
export default SmartContract;
