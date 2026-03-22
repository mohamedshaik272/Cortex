"""
Composes a message to a service provider.

Includes homeowner address, device details (brand, model, age), the issue
description, and availability. Returns the drafted message text.
"""


args = {
    "home_address": "Test home address",
    "asset":{
        "make": "Samsung",
        "model": "RF2HGIEH4R",
        "age": 5 
    },
    "issue": "The ice maker has stopped producing ice entirely."
}

def draft_message(args: dict) -> str:
    
    home_address = args.get("home_address", "Address not provided")
    asset = args.get("asset", {})
    make = asset.get("make", "Unknown make")
    model = asset.get("model", "Unknown model")
    age = asset.get("age","Unknown age" )

    issue = args.get("issue_description", "No issue description provided")
    

    message = f"""Hello,

I am reaching out to request service for an issue at my home

**Address** {home_address}

**Device Details:**

- Make: {make}
- Model: {model}
- Age: {age} year(s)

**Issue Description:**

{issue}

Please let me know your earliest available appointment and any additional information you may need. Thank you for your time, and I look forward to hearing from you.

Best regards"""
    
    return message


def main():
    print(draft_message(args))

if __name__ == "__main__":
    main()

    
