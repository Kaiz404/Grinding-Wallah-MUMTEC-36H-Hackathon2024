// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/** This Smart Contract Manages the Token Creation, Identity Access, and Activity Log of a Company*/
contract TokenManager {
    address public owner;
    mapping(address => bool) public admins;
    mapping(address => bool) public employees;
    mapping(address => TokenData) public employeeTokens;
    mapping(address => uint256[]) public employeeLogRequests;

    struct TokenData {
        uint256 tokenId;
        uint256 expiry;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Unauthorized Access: This Action is only allowed for Smart Contract Owner");
        _;
    }

    modifier adminOnly() {
        require(admins[msg.sender] || msg.sender == owner, "Unauthorized Access: This Action is only allowed for Program Admin");
        _;
    }

    modifier employeeOnly() {
        require(employees[msg.sender], "Unauthorized Access: This Action is only allowed for Assigned Employee");
        _;
    }

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event EmployeeAdded(address indexed employee);
    event EmployeeRemoved(address indexed employee);
    event TokenGenerated(address indexed employee, uint256 tokenId);
    event LogRequestAdded(address indexed employee, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    // Admin Management
    /** Add an Admin's Public Key to the Company's Program*/
    function addAdmin(address _admin) external ownerOnly {
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    /** Remove an Admin's Public Key from the Company's Program */
    function removeAdmin(address _admin) external ownerOnly {
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    // Employee Management
    /** Assign a new Public Key as an employee */
    function addEmployee(address _employee) external adminOnly {
        employees[_employee] = true;
        emit EmployeeAdded(_employee);
    }

    /** Remove a Public Key from the list of employees */
    function removeEmployee(address _employee) external adminOnly {
        require(employees[_employee], "Employee does not exist");
        employees[_employee] = false;
        emit EmployeeRemoved(_employee);
    }

    // Token System
    /** Assign a Session Token to an employee's Public Key for 24 hours */
    function generateToken(address _employee) external adminOnly {
        require(employees[_employee], "Employee does not exist");

        uint256 newTokenId = uint256(keccak256(abi.encodePacked(_employee, block.timestamp)));
        employeeTokens[_employee] = TokenData(newTokenId, block.timestamp + 24 hours);
        emit TokenGenerated(_employee, newTokenId);
    }

    /** Check whether an employee's Public Key has a valid token */
    function hasToken(address _employee) internal view employeeOnly returns (bool) {
        require(employees[_employee], "Employee does not exist");
        
        TokenData memory tokenData = employeeTokens[_employee];
        return block.timestamp < tokenData.expiry;
    }

    /** Add a Log Request to gain authorization before gaining access to company network system */
    function addLogRequest() external employeeOnly{
        require(hasToken(msg.sender), "Unauthorized Access: Invalid Token");
        
        employeeLogRequests[msg.sender].push(block.timestamp);
        emit LogRequestAdded(msg.sender, block.timestamp);
    }
}
