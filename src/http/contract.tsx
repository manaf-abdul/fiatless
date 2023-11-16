import axios from "axios";

export const callContractFunctionAPI = async (payload:any) => {
    const res = await axios.post('/api/transfer-contract',payload);
    return res.data
  };