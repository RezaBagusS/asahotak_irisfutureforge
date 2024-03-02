

// const backendURL = "https://be-travel-go.vercel.app";
const backendURL = "/api/v1/getUser";

interface LoginData {
    data : {
        email: string;
        password: string;
    }
}

export const loginHandler = async ({
    data,
    }: LoginData
) => {

    const response = await fetch(`${backendURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
  
    const dataRes = await response.json();
    console.log("Data Res : ", dataRes);
    
    return {
      error: dataRes.error || false,
      message: dataRes.message,
      data: dataRes || {},
    };

};
