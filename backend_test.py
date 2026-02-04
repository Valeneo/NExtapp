#!/usr/bin/env python3
"""
Backend API Testing for Notion Database Grid Embed Application
Tests the three main endpoints: GET health check, POST validate, POST database
"""

import requests
import json
import os
from typing import Dict, Any

# Get base URL from environment
BASE_URL = "https://nextjs-notion-embed.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def test_api_health_check():
    """Test GET /api/test endpoint"""
    print("\n=== Testing API Health Check ===")
    
    try:
        response = requests.get(f"{API_BASE}/test", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Notion Database Grid API":
                print("✅ Health check passed - correct message returned")
                return True
            else:
                print(f"❌ Health check failed - unexpected message: {data}")
                return False
        else:
            print(f"❌ Health check failed - unexpected status code: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check failed - request error: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Health check failed - JSON decode error: {e}")
        return False

def test_validate_endpoint_missing_credentials():
    """Test POST /api/validate with missing credentials"""
    print("\n=== Testing Validate Endpoint - Missing Credentials ===")
    
    test_cases = [
        {"payload": {}, "description": "Empty payload"},
        {"payload": {"notionApiKey": ""}, "description": "Missing databaseId"},
        {"payload": {"databaseId": ""}, "description": "Missing notionApiKey"},
        {"payload": {"notionApiKey": "", "databaseId": ""}, "description": "Empty credentials"},
    ]
    
    all_passed = True
    
    for test_case in test_cases:
        print(f"\nTesting: {test_case['description']}")
        
        try:
            response = requests.post(
                f"{API_BASE}/validate",
                json=test_case["payload"],
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code == 400:
                data = response.json()
                if "error" in data and "required" in data["error"].lower():
                    print("✅ Validation error handling works correctly")
                else:
                    print(f"❌ Unexpected error message: {data}")
                    all_passed = False
            else:
                print(f"❌ Expected 400 status code, got: {response.status_code}")
                all_passed = False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
            all_passed = False
        except json.JSONDecodeError as e:
            print(f"❌ JSON decode error: {e}")
            all_passed = False
    
    return all_passed

def test_database_endpoint_missing_credentials():
    """Test POST /api/database with missing credentials"""
    print("\n=== Testing Database Endpoint - Missing Credentials ===")
    
    test_cases = [
        {"payload": {}, "description": "Empty payload"},
        {"payload": {"notionApiKey": ""}, "description": "Missing databaseId"},
        {"payload": {"databaseId": ""}, "description": "Missing notionApiKey"},
        {"payload": {"notionApiKey": "", "databaseId": ""}, "description": "Empty credentials"},
    ]
    
    all_passed = True
    
    for test_case in test_cases:
        print(f"\nTesting: {test_case['description']}")
        
        try:
            response = requests.post(
                f"{API_BASE}/database",
                json=test_case["payload"],
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code == 400:
                data = response.json()
                if "error" in data and "required" in data["error"].lower():
                    print("✅ Database endpoint error handling works correctly")
                else:
                    print(f"❌ Unexpected error message: {data}")
                    all_passed = False
            else:
                print(f"❌ Expected 400 status code, got: {response.status_code}")
                all_passed = False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
            all_passed = False
        except json.JSONDecodeError as e:
            print(f"❌ JSON decode error: {e}")
            all_passed = False
    
    return all_passed

def test_invalid_endpoint():
    """Test invalid endpoint to verify 404 handling"""
    print("\n=== Testing Invalid Endpoint ===")
    
    try:
        response = requests.post(
            f"{API_BASE}/invalid",
            json={"test": "data"},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 404:
            data = response.json()
            if "error" in data and "invalid endpoint" in data["error"].lower():
                print("✅ Invalid endpoint handling works correctly")
                return True
            else:
                print(f"❌ Unexpected error message: {data}")
                return False
        else:
            print(f"❌ Expected 404 status code, got: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ JSON decode error: {e}")
        return False

def test_malformed_json():
    """Test endpoints with malformed JSON"""
    print("\n=== Testing Malformed JSON Handling ===")
    
    endpoints = ["/validate", "/database"]
    all_passed = True
    
    for endpoint in endpoints:
        print(f"\nTesting malformed JSON on {endpoint}")
        
        try:
            response = requests.post(
                f"{API_BASE}{endpoint}",
                data="invalid json",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code == 500:
                data = response.json()
                if "error" in data:
                    print("✅ Malformed JSON handling works correctly")
                else:
                    print(f"❌ Unexpected response format: {data}")
                    all_passed = False
            else:
                print(f"❌ Expected 500 status code, got: {response.status_code}")
                all_passed = False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
            all_passed = False
        except json.JSONDecodeError as e:
            print(f"❌ JSON decode error: {e}")
            all_passed = False
    
    return all_passed

def main():
    """Run all backend tests"""
    print("Starting Backend API Tests for Notion Database Grid Embed Application")
    print(f"Testing against: {API_BASE}")
    
    test_results = {
        "health_check": test_api_health_check(),
        "validate_missing_creds": test_validate_endpoint_missing_credentials(),
        "database_missing_creds": test_database_endpoint_missing_credentials(),
        "invalid_endpoint": test_invalid_endpoint(),
        "malformed_json": test_malformed_json()
    }
    
    print("\n" + "="*60)
    print("BACKEND TEST SUMMARY")
    print("="*60)
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests passed!")
        return True
    else:
        print("⚠️  Some backend tests failed")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)