import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Storage = () => {
  const { data: value } = useScaffoldContractRead({
    contractName: "SimpleStorage",
    functionName: "retrieve",
  });
  console.log("Current value", value);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "SimpleStorage",
    functionName: "store",
    args: [1234n],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div>
      <h1>Storage</h1>
      <h1>Value</h1>
      {isLoading ? <p>Loading...</p> : <p>{value?.toString()}</p>}
      <button onClick={() => writeAsync()}>Update Storage</button>
    </div>
  );
};

export default Storage;
