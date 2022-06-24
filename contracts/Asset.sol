// SPDX-License-Identifier: MIT
// This contract is used exclusively for tests!
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Asset is ERC20 {
    constructor (
    ) ERC20('Wirex Token', "WXT") public {
        _mint(msg.sender, 1000000000 * 10 ** 18);
    }
    function mint (address receiver, uint256 amount) public {
        _mint(receiver, amount);
    }
}
