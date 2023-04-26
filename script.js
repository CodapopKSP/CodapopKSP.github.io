const deleteContainer = document.getElementById('delete-container')
const urlParams = new URLSearchParams(window.location.search);
const queryString = urlParams.get('config');
const colorString = urlParams.get('color');
let activeDraggable = null;

function isPhone() {
  return /mobile/i.test(navigator.userAgent);
}

document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

const colorButtons = document.querySelectorAll('.color-button');
const box = document.querySelector('.box');

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const color = button.style.backgroundColor;
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
      box.style.borderColor = color;
    })
  });
});

const recommendedConfigsBtn = document.getElementById('recommendedConfigs');
recommendedConfigsBtn.addEventListener('click', function() {
  Swal.fire({
    title: 'Recommended Configurations',
    html:
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2400h1b1b2g1a3f3f5f6\'">Jebediah\'s Command</button>' +
    '<button id="btn2" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2300b3a4g1f3f6f5\'">USS Button Box</button>' +
    '<button id="btn3" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2300b1h1b2f2a5e1\'">Keyboard\'s Lament</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z1200f2a5\'">Keyboard Companion 1</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z1200f2g1\'">Keyboard Companion 2</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2200a5b3f4f5\'">External Command Seat 1</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2200g1b3f2a4\'">External Command Seat 2</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z2313h1b1b2f1f6g1z2115c1a3\'">Valentina\'s Command</button>' +
    '<button id="btn1" class="btn btn-primary text-center" onclick="window.location.href=\'https://codapopksp.github.io/?config=z3111a1h3f3z2413g1b1h1h2d1f5a2e1z3116c1b2f6\'">Mission Control</button>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
  });
});

const engineersReport = document.getElementById('report');
engineersReport.addEventListener('click', function() {
  let reportContent = '';
  const boxes = document.querySelectorAll('.box');
  let totalPrice = 0;
  let isSizeMismatch = false;

  boxes.forEach(box => {
    const draggables = box.querySelectorAll('.draggable');
    let boxPrice = parseFloat(box.getAttribute('data-price'));
    totalPrice += boxPrice;
    // Make sure all module docks are filled.
    if (draggables.length !== parseInt(box.getAttribute('data-size'))) {
      isSizeMismatch = true;
    }
    // Add the price of each draggable
    draggables.forEach(draggable => {
      const price = parseFloat(draggable.getAttribute('data-price'));
      totalPrice += price;
    });
    // Show price.
    if (boxPrice > 0) {
      reportContent += `<p style="color: #4d9de3;"><strong>${box.getAttribute('data-name')}</strong> - $${boxPrice.toFixed(2)}</p>`;
      draggables.forEach(draggable => {
        const price = parseFloat(draggable.getAttribute('data-price'));
        reportContent += `<p>&emsp;${draggable.getAttribute('data-name')} - $${price.toFixed(2)}</p>`;
      });
      reportContent += `<hr>`;
    } else {
      reportContent += `<p style="color: #df7070;">${box.getAttribute('data-name')} - <em>No items selected</em></p>`;
      reportContent += `<hr>`;
    }
  });

  // Add booleanas for modules and calculate if there are any conflicts
  var hasThrottle = false;
  var controlsys_duplicate = false;
  var executive_duplicate = false;
  var hasRotation = false;
  var hasTranslation = false;
  var rotation_duplicate = false;
  var translation_duplicate = false;
  var throttle_duplicate = false;
  var telemetry_overload = false;
  var nav_time = false;
  var navTime = false;

  var has_analog_throttle = false;
  var has_rotation_throttle = false;
  var has_throttle = false;
  var has_translation = false;
  var has_analog = false;
  var has_rotation = false;
  var has_control_sys = false;
  var has_executive_control = false;
  var has_stage = false;
  var has_executive_groups = false;
  var has_executive = false;
  var has_nav = false;
  var has_time = false;
  var has_navTime = false;

  // Check all modules
  boxes.forEach(box => {
    if (!has_analog_throttle) {
      has_analog_throttle = box.querySelector('#f2');
    }
    if (!has_rotation_throttle) {
      has_rotation_throttle = box.querySelector('#f4');
    }
    if (!has_throttle) {
      has_throttle = box.querySelector('#f6');
    }
    if (!has_translation) {
      has_translation = box.querySelector('#f5');
    }
    if (!has_analog) {
      has_analog = box.querySelector('#f1');
    }
    if (!has_rotation) {
      has_rotation = box.querySelector('#f3');
    }
    if (!has_control_sys) {
      has_control_sys = box.querySelector('#g1');
    }
    if (!has_executive_control) {
      has_executive_control = box.querySelector('#a5');
    }
    if (!has_stage) {
      has_stage = box.querySelector('#a2');
    }
    if (!has_executive_groups) {
      has_executive_groups = box.querySelector('#a4');
    }
    if (!has_executive) {
      has_executive = box.querySelector('#a3');
    }
    if (!has_nav) {
      has_nav = box.querySelector('#b2');
    }
    if (!has_time) {
      has_time = box.querySelector('#b1');
    }
    if (!has_navTime) {
      has_navTime = box.querySelector('#b3');
    }

    // Check for modules that conflict with the Telemetry module
    const has_time_thisbox = box.querySelector('#b1');
    const has_navTime_thisbox = box.querySelector('#b3');
    const has_executive_groups_thisbox = box.querySelector('#a4');
    const has_executive_control_thisbox = box.querySelector('#a5');
    const has_control_sys_thisbox = box.querySelector('#g1');
    const has_ag_thisbox = box.querySelector('#h1');
    const has_ag2_thisbox = box.querySelector('#h2');
    const has_ag3_thisbox = box.querySelector('#h3');
    const has_eva_thisbox = box.querySelector('#d1');
    const has_telem_thisbox = box.querySelector('#c1');
    if (has_telem_thisbox && (has_ag_thisbox || has_ag2_thisbox || has_ag3_thisbox || has_eva_thisbox || has_control_sys_thisbox || has_executive_control_thisbox || has_executive_groups_thisbox || has_time_thisbox || has_navTime_thisbox)) {
      telemetry_overload = true;
    }
  });
  // Check if there are any rotation/translation/throttle controls
  if (has_rotation_throttle || has_rotation || has_analog || has_analog_throttle) {
    hasRotation = true;
  }
  if (has_translation || has_analog || has_analog_throttle) {
    hasTranslation = true;
  }
  if (has_analog_throttle || has_rotation_throttle || has_throttle) {
    hasThrottle = true;
  }
  
  // Check if there are any SAS/Executive Actions/NavTime conflicts
  if (has_control_sys && has_executive_control) {
    controlsys_duplicate = true;
  }
  const exec_elements = [has_executive_control, has_stage, has_executive_groups, has_executive];
  let numTrue = 0;
  for (let i = 0; i < exec_elements.length; i++) {
    if (exec_elements[i]) {
      numTrue++;
    }
    if (numTrue === 2) {
      executive_duplicate = true;
      break;
    }
  }
  if ((has_nav || has_time)) {
    nav_time = true;
  }
  if (has_navTime) {
    navTime = true;
  }

  // Check if there are any analog conflicts
  const rot_elements = [has_rotation_throttle, has_rotation, has_analog, has_analog_throttle];
  numTrue = 0;
  for (let i = 0; i < rot_elements.length; i++) {
    if (rot_elements[i]) {
      numTrue++;
    }
    if (numTrue === 2) {
      rotation_duplicate = true;
      break;
    }
  }
  const trans_elements = [has_translation, has_analog, has_analog_throttle];
  numTrue = 0;
  for (let i = 0; i < trans_elements.length; i++) {
    if (trans_elements[i]) {
      numTrue++;
    }
    if (numTrue === 2) {
      translation_duplicate = true;
      break;
    }
  }
  const throt_elements = [has_rotation_throttle, has_throttle, has_analog_throttle];
  numTrue = 0;
  for (let i = 0; i < throt_elements.length; i++) {
    if (throt_elements[i]) {
      numTrue++;
    }
    if (numTrue === 2) {
      throttle_duplicate = true;
      break;
    }
  }

  // Construct the warning message based on conflicting modules
  recommendation = '';
  if (isSizeMismatch || (hasRotation && !hasThrottle) || (hasRotation && !hasTranslation) || (!hasRotation && hasTranslation) || translation_duplicate || rotation_duplicate || throttle_duplicate || executive_duplicate || (nav_time && navTime) || controlsys_duplicate || telemetry_overload) {
    recommendation += `<hr><p style="color: #afe06b;"><strong>Warning:</strong></p>`;
  } else if (totalPrice > 0){
    recommendation += `<p style="color: #22aa37;">This controller has passed all checks.</p>`;
  }
  if (isSizeMismatch) {
    recommendation += `<p style="color: #ee2828;">One or more of your containers does not have the correct number of modules.</p>`;
  }
  if (hasRotation && !hasThrottle) {
    recommendation += `<p style="color: #ffe600;">You are missing a way to control the throttle.</p>`;
  }
  if (hasRotation && !hasTranslation) {
    recommendation += `<p style="color: #ffe600;">You are missing Translation controls.</p>`;
  }
  if (!hasRotation && hasTranslation) {
    recommendation += `<p style="color: #ffe600;">You are missing Rotation controls.</p>`;
  }
  if (translation_duplicate) {
    recommendation += `<p style="color: #ffe600;">You have too many ways to control Translation.</p>`;
  }
  if (rotation_duplicate) {
    recommendation += `<p style="color: #ffe600;">You have too many ways to control Rotation.</p>`;
  }
  if (throttle_duplicate) {
    recommendation += `<p style="color: #ffe600;">You have too many ways to control Throttle.</p>`;
  }
  if (executive_duplicate) {
    recommendation += `<p style="color: #ffe600;">You have multiple ways to activate the Stage function.</p>`;
  }
  if (nav_time && navTime) {
    recommendation += `<p style="color: #ffe600;">You are using the combined Navigation (Time) module with either the Navigation or Time module.</p>`;
  }
  if (controlsys_duplicate) {
    recommendation += `<p style="color: #ffe600;">You have two ways to control SAS and RCS.</p>`;
  }
  if (telemetry_overload) {
    recommendation += `<p>You are using the Telemetry module with another module that needs data from Simpit. This will result in the second module's displays not updating properly.</p>`;
  }
  recommendation += `<hr>`;

  // Display the final price
  const report = `
    <div>
      ${reportContent}
      <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
      ${recommendation}
    </div>
  `;

  Swal.fire({
    title: 'Engineer\'s Report',
    html: report,
    showCancelButton: true,
    cancelButtonText: 'Ok',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
  });
});

//Function for updating the price to reflect the current canvas items
const priceDisplay = document.getElementById('price-display')
function updateTotalPrice() {
  let totalPrice = 0
  const containerBoxes = document.querySelectorAll('.box');
  containerBoxes.forEach(containerBox => {
    const price = parseFloat(containerBox.dataset.price);
    totalPrice += price;
  });
  const type1Containers = document.querySelectorAll('.module-dock[data-type="type1"]');
  type1Containers.forEach(container => {
    const draggablesInContainer = container.querySelectorAll('.draggable');
    draggablesInContainer.forEach(draggable => {
      const price = parseFloat(draggable.dataset.price);
      totalPrice += price;
    });
  });
  priceDisplay.innerText = `Total: $${parseInt(totalPrice.toFixed(2))}`;
};

// Save Button
const save = document.getElementById('save')
save.addEventListener('click', function() {
  const draggableIds = [];
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    if (box.id.includes('one-two')) {
      draggableIds.push('z12');
    }
    if (box.id.includes('two-one')) {
      draggableIds.push('z21');
    }
    if (box.id.includes('three-one')) {
      draggableIds.push('z31');
    }
    if (box.id.includes('two-two')) {
      draggableIds.push('z22');
    }
    if (box.id.includes('two-three')) {
      draggableIds.push('z23');
    }
    if (box.id.includes('two-four')) {
      draggableIds.push('z24');
    }
    let parentContainer = box.parentNode;
    if (parentContainer.id.includes('canvas')) {
      draggableIds.push('00');
    } else {
      draggableIds.push(parentContainer.id);
    }
    const draggables = box.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
      draggableIds.push(draggable.id);
    });
  })
  const color = boxes[0].style.borderColor;
  // Add the color information to the end of the draggableIds array
  if (color) {
    draggableIds.push(`&color=${color.replace(/\s/g, '')}`);
  } else {
    draggableIds.push(`&color=rgb(0,0,0)`);
  }
  const url = "https://codapopksp.github.io/?config=" + draggableIds.join('');
  navigator.clipboard.writeText(url).then(() => {
    //alert("This configuration URL has been copied to your clipboard! \n\n" + url);
    Swal.fire({
      title: 'Copied!',
      html: '<div>This configuration URL has been copied to your clipboard!<br><br>' + url + '</div>',
      icon: 'success',
      buttonsStyling: false,
      showConfirmButton: false,
      timer: 3000,
    });
  }).catch(() => {
    alert("Failed to copy the configuration URL to your clipboard. Please copy it manually: \n\n" + url);
  });
});


// Handle drag, drop, and mouse over for modules
const draggables = document.querySelectorAll('.draggable')
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', function(event) {
    draggable.classList.add('dragging');
    event.dataTransfer.setData('text/plain', this.id);
    let tooltip = draggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    // Release container slot from forcing the tooltip to be on top
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
    deleteContainer.classList.add('highlight');
  });
  
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    updateTotalPrice();
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    // Release container slot from forcing the tooltip to be on top
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
    deleteContainer.classList.remove('highlight');
  });

  // Show tooltip and determine where to display the tooltip
  draggable.addEventListener('mouseover', (event) => {
    const tooltip = draggable.querySelector(".tooltip");
    draggable.classList.add("mouseover");
    tooltip.style.display = 'block';
    const rect = event.target.getBoundingClientRect();
    const position = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
    if (position < window.innerWidth / 2) {
      tooltip.classList.remove('right');
      tooltip.classList.add('left');
    } else {
      tooltip.classList.remove('left');
      tooltip.classList.add('right');
    }
    const positionv = rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2);
    if (positionv < window.innerHeight / 5) {
      tooltip.classList.remove('bottom');
      tooltip.classList.add('top');
    } else {
      tooltip.classList.remove('top');
      tooltip.classList.add('bottom');
    }
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = 70;
    }
    activeDraggable = draggable;
  });
  
  draggable.addEventListener('mouseout', () => {
    let tooltip = draggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    draggable.classList.remove("mouseover");
    let parentContainer = draggable.parentNode;
    let parentContainerType = parentContainer.getAttribute("data-type");
    // Release container slot from forcing the tooltip to be on top
    if (parentContainerType === "type1") {
      let parentContainer2 = parentContainer.parentNode;
      let parentContainer3 = parentContainer2.parentNode;
      let parentContainer4 = parentContainer3.parentNode;
      parentContainer4.style.zIndex = '';
    }
  });
});

// Light Switch
const lightSwitch = document.getElementById('lights')
lightSwitch.addEventListener('click', function() {
  this.classList.toggle('light');
  const modules_with_lights = document.querySelectorAll('.draggable.light');
  modules_with_lights.forEach(module => {
    const image1 = module.querySelector('.image-1');
    const image2 = module.querySelector('.image-2');
    image1.classList.toggle('hidden');
    image2.classList.toggle('hidden');
  });
});

// Contact Button
const contactButton = document.getElementById('contact')
contactButton.addEventListener('click', function() {
  //alert("===============================================\n\nIf you'd like to contact me, you may do so via Reddit, Discord, Instagram, or email.\n\nReddit:          u/CodapopKSP\nDiscord:        Codapop#1469\nInstagram:    untitled_space_craft\nemail:            UntitledSpaceCraft.Controllers@gmail.com\n\n\nFor more information, please visit my subreddit:\n\nhttps://www.reddit.com/r/UntitledSpaceCraft/\n\n===============================================");
  Swal.fire({
    title: 'Contact Information',
    html:
    '<div class="contacttext" style="font-family: \'Orbitron\', sans-serif;">Click a button to copy.</div>' +
    '<button class="btn btn-reddit text-center" data-clipboard-text="https://www.reddit.com/user/CodapopKSP">Reddit:   u/CodapopKSP</button>' +
    '<button class="btn btn-discord text-center" data-clipboard-text="Codapop#1469">Discord:   Codapop#1469</button>' +
    '<button class="btn btn-insta text-center" data-clipboard-text="untitled_space_craft">Instagram: untitled_space_craft</button>' +
    '<button class="btn btn-email text-center" data-clipboard-text="untitledspacecraft.controllers@gmail.com">Email: untitledspacecraft\n.controllers@gmail.com</button>' +
    '<div style="font-family: \'Roboto\', sans-serif;"><br></br>You can also visit the Untitled Space Craft subreddit for more information.</div>' +
    '<button class="btn btn-primary text-center" onclick="window.open(\'https://www.reddit.com/r/UntitledSpaceCraft/\', \'_blank\')">Click to visit r/UntitledSpaceCraft</button>',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    buttonsStyling: false,
    showConfirmButton: false,
    customClass: {
      cancelButton: 'btn btn-danger',
    },
    didOpen: () => {
      const clipboard = new ClipboardJS('.btn', {
        text: function(trigger) {
          return trigger.getAttribute('data-clipboard-text');
        }
      });
      clipboard.on('success', function(e) {
        e.clearSelection();
        Swal.fire({
          title: 'Copied to clipboard!',
          text: e.text,
          icon: 'success',
          buttonsStyling: false,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'copy-to-clipboard'
          }
        });
      });
    }
  });
});


const containerGrids = document.querySelectorAll('.container-grid, .container-grid2');
containerGrids.forEach(containerGrid => {
  containerGrid.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  // Determine the type of container and prepare the grid for resizing
  containerGrid.addEventListener('drop', (event) => {
    event.preventDefault();
    const draggable = document.querySelector('.dragging2');
    const dropContainer = event.target.closest('.container2');
    if (dropContainer && draggable) {
      dropContainer.appendChild(draggable);
      draggable.classList.add('dropped-box');
      if (draggable.classList.contains('two-four')) {
          dropContainer.classList.add('has-24child');
      }
      if (draggable.classList.contains('two-three')) {
          dropContainer.classList.add('has-23child');
      }
      if (draggable.classList.contains('two-two')) {
          dropContainer.classList.add('has-22child');
      }
      if (draggable.classList.contains('one-two')) {
          dropContainer.classList.add('has-12child');
      }
      if (draggable.classList.contains('three-one')) {
          dropContainer.classList.add('has-31child');
      }
      if (draggable.classList.contains('two-one')) {
        dropContainer.classList.add('has-21child');
      }
    }

    // Reset grids
    const containers = document.querySelectorAll('.container2');
    containers.forEach(container => {
      const containerChildren = container.children;
      if (containerChildren.length === 0) {
        container.classList.remove('has-24child');
        container.classList.remove('has-23child');
        container.classList.remove('has-22child');
        container.classList.remove('has-12child');
        container.classList.remove('has-31child');
        container.classList.remove('has-21child');
      }
    });
  });
});

// Buttons for adding new containers
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x4');
    addButton.addEventListener('click', () => {
      addContainer(MarkV, '.two-four');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x3');
    addButton.addEventListener('click', () => {
      addContainer(MarkIV, '.two-three');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-2x2');
    addButton.addEventListener('click', () => {
      addContainer(MarkIII, '.two-two');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-1x2');
    addButton.addEventListener('click', () => {
      addContainer(MarkIhoriz, '.one-two');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-3x1');
    addButton.addEventListener('click', () => {
      addContainer(MarkII, '.three-one');
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-2x1');
  addButton.addEventListener('click', () => {
    addContainer(MarkIvert, '.two-one');
  });
});


// Delete Box
deleteContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});
deleteContainer.addEventListener('touchstart', function(event) {
  if (activeDraggable) {
    let tooltip = activeDraggable.querySelector(".tooltip");
    tooltip.style.display = 'none';
    event.preventDefault()
    const containers = document.querySelectorAll('.module-dock[data-type="type2"]');
    for (const container of containers) {
      const emptySlots = container.querySelectorAll('.draggable').length < 1;
        if (emptySlots) {
            container.appendChild(activeDraggable);
            /*elementToDelete.classList.remove("mouseover");
            let tooltip = activeDraggable.querySelector(".tooltip");
            tooltip.style.display = 'none';*/
            activeDraggable = null;
            break;
        }
    }
  }
  updateTotalPrice()
})
deleteContainer.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text/plain');
    const elementToDelete = document.getElementById(id);
    activeDraggable = null;
  
    if (elementToDelete && (elementToDelete.classList.contains('box'))) {
        elementToDelete.remove();
        const containers = document.querySelectorAll('.module-dock[data-type="type2"]');
        const droppedModules = elementToDelete.querySelectorAll('[draggable="true"]');
        for (const module of droppedModules) {
            for (const container of containers) {
                const emptySlots = container.querySelectorAll('.draggable').length < 1;
                if (emptySlots) {
                    container.appendChild(module);
                    break;
                }
            }
        }
        elementToDelete.remove();
    // Move modules back to sides
    } else if (elementToDelete && elementToDelete.classList.contains('draggable')) {
        const containers = document.querySelectorAll('.module-dock[data-type="type2"]');
        let droppedIntoContainer = false;
        for (const container of containers) {
          const emptySlots = container.querySelectorAll('.draggable').length < 1;
            if (emptySlots) {
                container.appendChild(elementToDelete);
                elementToDelete.classList.remove("mouseover");
                let tooltip = elementToDelete.querySelector(".tooltip");
                tooltip.style.display = 'none';
                droppedIntoContainer = true;
                break;
            }
        }
    }
    // Reset grids
    const containers = document.querySelectorAll('.container2');
    containers.forEach(container => {
      const containerChildren = container.children;
      if (containerChildren.length === 0) {
        container.classList.remove('has-24child');
        container.classList.remove('has-23child');
        container.classList.remove('has-22child');
        container.classList.remove('has-12child');
        container.classList.remove('has-31child');
        container.classList.remove('has-21child');
      }
    });
    updateTotalPrice()
});

// Add a container of a specific size
function addContainer(containerData, type) {
    const existingBoxes = document.querySelectorAll('.dropped-box');
    const requiredBoxes = document.querySelectorAll('.box');
      if (existingBoxes.length === requiredBoxes.length) {
        const counter = Math.floor(Math.random() * 10000).toString() + type;
        // Choose a random ID
        const containerBoxHTML = `<div id="${counter}" ${containerData}`;
        const containerBoxElement = document.createElement('div');
        containerBoxElement.innerHTML = containerBoxHTML.trim();
        const containerBox = containerBoxElement.firstChild;
        const pageWrapper = document.getElementById('canvas');
        pageWrapper.appendChild(containerBox);
        updateTotalPrice()

        // Handle picking up the container
        const containerBoxes = document.querySelectorAll(type);
        containerBoxes.forEach(containerBox => {
          containerBox.addEventListener('dragstart', (event) => {
              if (event.target.id === counter) {
                  event.dataTransfer.setData('dragged', event.target.id);
                  event.target.classList.add('dragging2');
                  const id = event.target.id;
                  event.dataTransfer.setData('text/plain', id);
                  const containers = document.querySelectorAll('.container2')
                  containers.forEach(container => {
                      container.classList.add('has-drag');
                  })
                  deleteContainer.classList.add('highlight');
              }
          });

          // Drop the container
          containerBox.addEventListener('dragend', (event) => {
            if (event.target.id === counter) {
              event.target.classList.remove('dragging2');
              const containers = document.querySelectorAll('.container2')
              containers.forEach(container => {
                  container.classList.remove('has-drag');
              })
              deleteContainer.classList.remove('highlight');
            }
          });
        });

        // Handle module docks on containers
        const containers = document.querySelectorAll('.module-dock')
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
            })
            container.addEventListener('drop', () => {
              const draggable = document.querySelector('.dragging')
              if (draggable) {
                let childElements = container.querySelectorAll('*');
                if (childElements.length === 0) {
                  container.appendChild(draggable);
                  draggable.classList.remove('dragging');
                }
              }
              updateTotalPrice();
            })
            container.addEventListener('touchstart', function(event) {
              if (activeDraggable) {
                let childElements = container.querySelectorAll('*');
                if (childElements.length === 0) {
                  container.appendChild(activeDraggable);
                  let tooltip = activeDraggable.querySelector(".tooltip");
                  tooltip.style.display = 'none';
                  activeDraggable = null;
                  event.preventDefault()
                  updateTotalPrice()
                }
              }
            })
        })

        // Remove welcome message
        let messageElement = document.getElementById("welcome-message");
        messageElement.style.display = "none";
  } else {
    Swal.fire({
      title: 'Error',
      text: 'Please drag and drop the current container either to a canvas grid or to the trash before adding a new container.',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Ok',
      buttonsStyling: false,
      showConfirmButton: false,
      customClass: {
        cancelButton: 'btn btn-danger',
      },
    });
  }
}

// Container Data
const MarkIhoriz = `
        class="one-two box" data-price="50" data-name="Mark I Container (Horizontal)" data-size="2" draggable="true">
          <div class="ruler horizontal-ruler">
            <div class="horizontal-ruler-label">24cm</div>
          </div>
          <div class="ruler vertical-ruler">
            <div class="vertical-ruler-label">12.5cm</div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkIvert = `
        class="two-one box" data-price="50" data-name="Mark I Container (Vertical)" data-size="2" draggable="true">
          <div class="ruler horizontal-ruler">
            <div class="horizontal-ruler-label">12.5cm</div>
          </div>
          <div class="ruler vertical-ruler">
            <div class="vertical-ruler-label">24cm</div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkII = `
        class="three-one box" data-price="60" data-name="Mark II Container" data-size="3" draggable="true">
          <div class="ruler horizontal-ruler">
            <div class="horizontal-ruler-label">12.5cm</div>
          </div>
          <div class="ruler vertical-ruler">
            <div class="vertical-ruler-label">35.5cm</div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkIII = `
        class="two-two box" data-price="70" data-name="Mark III Container" data-size="4" draggable="true">
          <div class="ruler horizontal-ruler">
            <div class="horizontal-ruler-label">24cm</div>
          </div>
          <div class="ruler vertical-ruler">
            <div class="vertical-ruler-label">24cm</div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkIV = `
        class="two-three box" data-price="90" data-name="Mark IV Container" data-size="6" draggable="true">
          <div class="ruler horizontal-ruler">
            <div class="horizontal-ruler-label">35.5cm</div>
          </div>
          <div class="ruler vertical-ruler">
            <div class="vertical-ruler-label">24cm</div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;
const MarkV = `
        class="two-four box" data-price="120" data-name="Mark V Container" data-size="8" draggable="true">
          <div class="ruler horizontal-ruler">
            <div class="horizontal-ruler-label">47cm</div>
          </div>
          <div class="ruler vertical-ruler">
            <div class="vertical-ruler-label">24cm</div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/angled.png'); background-size: cover;"></div>
          </div>
          <div class="container-slot-row">
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
            <div class="module-dock" data-type="type1" style="background-image: url('containers/level.png'); background-size: cover;"></div>
          </div>
        </div>
        `;

// Load a controller from a valid URL
function loadController(inputData, color) {
  let importConfig = inputData;
  let startIndex = 0;
  let objectArray = [];
  // Extract all containers from the string
  while (true) {
    const nextZIndex = importConfig.indexOf('z', startIndex + 1);
    if (nextZIndex === -1) {
      objectArray.push(importConfig.substring(startIndex));
      break;
    }
    objectArray.push(importConfig.substring(startIndex, nextZIndex));
    startIndex = nextZIndex;
  }
  // Parse the data from the container strings and determine the container type
  for (const object of objectArray) {
    const first5Chars = object.substring(0, 5);
    const containerAddress = first5Chars.substring(1);
    const modules = [];
    for (let i = 5; i < object.length; i += 2) {
      modules.push(object.substring(i, i + 2));
    }
    let containerType = '';
    if (containerAddress.startsWith('12')) {
        containerType = '.one-two'
        addContainer(MarkIhoriz, containerType);
    }
    if (containerAddress.startsWith('21')) {
      containerType = '.two-one'
      addContainer(MarkIvert, containerType);
    }
    if (containerAddress.startsWith('31')) {
      containerType = '.three-one'
      addContainer(MarkII, containerType);
    }
    if (containerAddress.startsWith('22')) {
      containerType = '.two-two'
      addContainer(MarkIII, containerType);
    }
    if (containerAddress.startsWith('23')) {
      containerType = '.two-three'
      addContainer(MarkIV, containerType);
    }
    if (containerAddress.startsWith('24')) {
      containerType = '.two-four'
      addContainer(MarkV, containerType);
    }
    const targetContainerId = containerAddress.slice(2);
    const boxes = document.querySelectorAll(containerType);
    // Determine the container address
    boxes.forEach(box => {
      let parentContainer = box.parentNode;
      if (parentContainer.id.includes('canvas')) {
        if (targetContainerId!=='00') {
          box.classList.add('dropped-box');
          const targetContainer = document.getElementById(targetContainerId);
          targetContainer.insertAdjacentElement('beforeend', box);
        }
        const draggables = modules.map(pair => document.getElementById(pair));
        const containers = box.querySelectorAll(`.module-dock[data-type="type1"]`);
        // Get all modules and add them to the containers
        for (let i = 0; i < modules.length; i++) {
          const draggable = draggables[i];
          const container = containers[i];
          if (draggable) {
            container.appendChild(draggable);
          }
        }
      }
      if (color) {
        box.style.borderColor = color;
      }
    })
    // Update the canvas elements as if someone dragged and dropped the containers and modules
    const containers = document.querySelectorAll('.container2');
    containers.forEach(container => {
      const containerChildren = Array.from(container.children);
      if (containerChildren) {
        containerChildren.forEach(child => {
          if (child.classList.contains('two-four')) {
            container.classList.add('has-24child');
          }
          if (child.classList.contains('two-three')) {
            container.classList.add('has-23child');
          }
          if (child.classList.contains('two-two')) {
            container.classList.add('has-22child');
          }
          if (child.classList.contains('one-two')) {
            container.classList.add('has-12child');
          }
          if (child.classList.contains('three-one')) {
            container.classList.add('has-31child');
          }
          if (child.classList.contains('two-one')) {
            container.classList.add('has-21child');
          }
        })
      }
    })
  }
  updateTotalPrice()
}

window.onload = function() {
  if (queryString) {
    if (queryString.startsWith('z')) {
      loadController(queryString, colorString);
    }
  }
}