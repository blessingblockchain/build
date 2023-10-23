document.addEventListener("DOMContentLoaded", async () => {
    // Check if window.ethereum is available (e.g., MetaMask)
    if (window.ethereum) {
        // create ethers.js provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // access the user account (connected account)
        const signer = provider.getSigner();

        // You can now use ethers.js to interact with Ethereum:

        const contractAbi = [
            {
                constant: false,
                inputs: [
                    {
                        name: "_data",
                        type: "uint256",
                    },
                ],
                name: "setData",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "data",
                outputs: [
                    {
                        name: "",
                        type: "uint256",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ];

        const contractAddress = "0xad8F8Aa45485B5e68BB806cbde20f371C089Af93"; // Replace with your deployed contract address - this is deployed on goerli

        // Create an instance of our smart contract
        const simpleStorageContract = new ethers.Contract(contractAddress, contractAbi, signer);

        // Define the setData function in the global scope so it can be accessed out side here
        window.setData = async () => {
            const newValueElement = document.getElementById("newValue");
            const newValue = newValueElement.value;

            try {
                const tx = await simpleStorageContract.setData(newValue);
                await tx.wait(); // Wait for the transaction to be mined
                getCurrentValue();
            } catch (error) {
                console.error("Error setting data: ", error);
            }
        };

        const currentValueElement = document.getElementById("currentValue");
        const newValueElement = document.getElementById("newValue");

        // Function to get the current value
        const getCurrentValue = async () => {
            const result = await simpleStorageContract.data();
            currentValueElement.innerText = result.toString();
            console.log(result.toString());
        };

        getCurrentValue();
    } else {
        alert("Please install MetaMask or use a web3-enabled browser.");
    }
});
