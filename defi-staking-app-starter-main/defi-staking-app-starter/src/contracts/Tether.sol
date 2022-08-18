pragma solidity ^0.8.0;

contract Tether {
    string public name = "Mock Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18; // In Solidity you can't work with decimals and/or fractions

    // Indexed allows us to filter through the addresses so we can search troughout them
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // Keep track of each wallet balance
    mapping(address => uint256) public balanceOf;
    // Checking through each address and watching what is each one
    mapping(address => mapping(address => uint256)) public allowance;

    // Only runs once when deploying
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    // Transfer from your own account (no need to approve)
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // require that the value is greater or equal for transfer
        require(_value <= balanceOf[msg.sender]);
        // transfer the amount and subtract the balance
        balanceOf[msg.sender] -= _value;
        // Add the balance
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Transfer from one account into another (need to approve)
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // require that the value is greater or equal for transfer
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        // transfer the amount and subtract the balance
        balanceOf[_to] += _value;
        // Add the balance
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}
