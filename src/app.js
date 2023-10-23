document.addEventListener('DOMContentLoaded', async () => {
    if (typeof web3 !== 'undefined') {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        alert("Please install MetaMask or use a web3-enabled browser.");
    }

    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
    const contractAbi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_data",
                    "type": "uint256"
                }
            ],
            "name": "setData",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "data",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    window.simpleStorageContract = new web3.eth.Contract(contractAbi, contractAddress);

    const currentValueElement = document.getElementById('currentValue');
    const newValueElement = document.getElementById('newValue');

    // Function to get current value
    const getCurrentValue = async () => {
        const result = await simpleStorageContract.methods.data().call();
        currentValueElement.innerText = result;
    }

    // Function to set new value
    const setData = async () => {
        const newValue = newValueElement.value;
        await simpleStorageContract.methods.setData(newValue).send({from: web3.eth.defaultAccount});
        getCurrentValue();
    }

    // Set the default account to interact with the contract
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];

    getCurrentValue();
});
