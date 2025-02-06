## What is Vanilla Feature Flag?

Its a simple pure Vanilla JavaScript library package for integrating feature flags using our UI with any application.

## Installation

```
npm i or npm install @ankrajg/vanillafeatureflag
```

## Set up

### JS Importing and Implementation
```
import vanillaFeatureFlags from "@ankrajg/vanillafeatureflag";

vanillaFeatureFlags({ silver: false, platinum: true });
```

### HTML Implementation 
```
<div id="featureFlagApp" class="app">
    <h1>Feature Flags</h1>
    <div id="flagsContainer" class="flags-container"></div>
    <div id="subscriptionConatiner"></div>
</div>
```