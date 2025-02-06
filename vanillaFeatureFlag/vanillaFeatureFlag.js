import "./styles.css";
import { featureFlags, getSubscriptionFeatures } from "./flags-data";

const appId = document.getElementById("featureFlagApp");
const flagsContainer = document.getElementById("flagsContainer");
let featureFlagsClone = { ...featureFlags };
let subscriptionFeatures = getSubscriptionFeatures();

const updateFeatureFlags = (moreFlags) => {
  featureFlagsClone = { ...featureFlagsClone, ...moreFlags };
  subscriptionFeatures = getSubscriptionFeatures(featureFlagsClone);
};

const checkForFeaturesEnabled = () => {
  if (featureFlagsClone["darkMode"]) {
    appId.classList.add("darkMode");
  } else {
    appId.classList.remove("darkMode");
  }

  for (let key in subscriptionFeatures) {
    if (subscriptionFeatures.hasOwnProperty(key) && key !== "darkMode") {
      const button = document.querySelector(`#${key} button`);
      const head3 = document.querySelector(`#${key} h3`);

      button.style.display = featureFlagsClone[key] ? "none" : "inline-block";
      head3.style.display = featureFlagsClone[key] ? "inline-block" : "none";
    }
  }
};

const prepareInitStructure = () => {
  const wrapper = document.getElementById("subscriptionConatiner");
  //let innerContents = "";
  for (let key in subscriptionFeatures) {
    if (subscriptionFeatures.hasOwnProperty(key) && key !== "darkMode") {
      // innerContents =
      //   innerContents +
      //   `<div id="${key}" class="sub-wrapper">
      //   <h2>${subscriptionFeatures[key].label}</h2>
      //   <button>Try for free!</button>
      //   <h3>Enabled</h3>
      //   </div>`;

      const div = document.createElement("div");
      div.setAttribute("id", key);
      div.classList.add("sub-wrapper");
      const h2 = document.createElement("h2");
      h2.innerHTML = subscriptionFeatures[key].label;
      div.appendChild(h2);
      const button = document.createElement("button");
      button.innerHTML = "Try for free!";
      div.appendChild(button);
      const h3 = document.createElement("h3");
      h3.innerHTML = "Enabled";
      div.appendChild(h3);
      wrapper.appendChild(div);
    }
  }
  //wrapper.innerHTML = innerContents;
};

const prepareFlagCheckboxes = () => {
  for (let key in subscriptionFeatures) {
    if (subscriptionFeatures.hasOwnProperty(key)) {
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", key);
      checkbox.setAttribute("name", key);
      checkbox.checked = featureFlagsClone[key];
      flagsContainer.appendChild(checkbox);
      const label = document.createElement("label");
      label.setAttribute("for", key);
      label.innerHTML = subscriptionFeatures[key].label;
      flagsContainer.appendChild(label);
      const br = document.createElement("br");
      flagsContainer.appendChild(br);
    }
  }
};

const handleCheckbox = (event) => {
  const name = event.target.name;
  featureFlagsClone[name] = event.target.checked;
  checkForFeaturesEnabled();
};

const FeatureFlagMount = (moreFlags = {}) => {
  updateFeatureFlags(moreFlags);
  prepareFlagCheckboxes();
  prepareInitStructure();
  checkForFeaturesEnabled();

  flagsContainer.addEventListener("click", handleCheckbox);
};

export default FeatureFlagMount;
