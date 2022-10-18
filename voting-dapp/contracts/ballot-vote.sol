pragma solidity >=0.8.0;

contract Ballot {
    struct Voter {
        uint256 voteIndex;
        bool voted;
        uint8 weight; // Weight of the vote
    }

    struct Proposal {
        bytes32 name; // The name of each proposal
        uint256 voteCount; // Number of accumulated votes
    }

    Proposal[] public proposals;

    // Allows us to create a store value with keys and indexes
    mapping(address => Voter) public voters; // voters gets addres as a key and Voter for value

    // For authentication
    address public chairperson;

    // Will add the proposal names to the smart contract upon deployment
    // Memory defines a temporary data location during runtime
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;

        voters[chairperson].weight = 1;

        for (uint8 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    // Function to give permissions
    function giveRightToVote(address voter) public {
        require(chairperson == msg.sender, "Only the chairpeson");
        // Require that the voter hasn't voted yet
        require(!voters[voter].voted, "Already has permissions");
        require(voters[voter].weight == 0, "Already has permissions");

        voters[voter].weight = 1;
    }

    // Function for voting
    function vote(uint256 proposalIndex) public {
        Voter storage sender = voters[msg.sender];

        // They can't have a weight of 0
        require(sender.weight != 0, "No right to vote");
        require(!sender.voted, "Already voted");

        sender.voted = true;
        sender.voteIndex = proposalIndex;
        proposals[proposalIndex].voteCount += sender.weight;
    }

    // Functions for showing the results

    // Functions that shows the winning proposal by integer
    function winnerProposalIndex()
        public
        view
        returns (uint256 winnerProposal)
    {
        uint256 winningVoteCount = 0;
        for (uint256 i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winnerProposal = i;
            }
        }
    }

    // Function that shows the winner by the name
    function winningNameProposal() public view returns (bytes32 winningName) {
        winningName = proposals[winnerProposalIndex()].name;
    }
}
