//|---------------------------|
//|     Engineer's Report     |
//|---------------------------|

// Engineer's Report checks for module compatibility and gives a price breakdown of the current configuration.

// Engineer's Report Button
const engineersReport = document.getElementById('report');

// Build a report showing controller stats and errors
engineersReport.addEventListener('click', function() {
  let reportContent = '';
  const boxes = document.querySelectorAll('.box');
  let totalPrice = 0;
  let isSizeMismatch = false;

  // Check to make sure each container is filled and display price breakdown
  boxes.forEach(box => {
    const draggables = box.querySelectorAll('.draggable');
    let boxPrice = parseFloat(box.getAttribute('data-price'));
    totalPrice += boxPrice;

    // Make sure all module docks are filled
    if (draggables.length !== parseInt(box.getAttribute('data-size'))) {
      isSizeMismatch = true;
    }

    // Add the price of each draggable
    draggables.forEach(draggable => {
      const price = parseFloat(draggable.getAttribute('data-price'));
      totalPrice += price;
    });

    // Show price
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
  let hasThrottle = false;
  let controlsys_duplicate = false;
  let executive_duplicate = false;
  let hasRotation = false;
  let hasTranslation = false;
  let rotation_duplicate = false;
  let translation_duplicate = false;
  let throttle_duplicate = false;
  let telemetry_overload = false;
  let nav_time = false;
  let navTime = false;

  let has_analog_throttle = false;
  let has_rotation_throttle = false;
  let has_throttle = false;
  let has_translation = false;
  let has_analog = false;
  let has_rotation = false;
  let has_control_sys = false;
  let has_executive_control = false;
  let has_stage = false;
  let has_executive_groups = false;
  let has_executive = false;
  let has_nav = false;
  let has_time = false;
  let has_navTime = false;
  let separated_analog = false;

  // Check all modules for conflicts
  boxes.forEach(box => {

    // Check each container to see if specific modules are present
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

    // Check to make sure combined analog modules are on the same container if present
    if (!separated_analog) {
      const has_rotation1_thisbox = box.querySelector('#f3');
      const has_rotation2_thisbox = box.querySelector('#f4');
      const has_rotation_thisbox = (has_rotation1_thisbox || has_rotation2_thisbox);
      const has_translation_thisbox = box.querySelector('#f5');
      if ((has_rotation_thisbox && !has_translation_thisbox) || (!has_rotation_thisbox && has_translation_thisbox)) {
        separated_analog = true;
      }
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
  
  // Check if there are any SAS/Executive conflicts
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

  // Check if config has Nav AND/OR Time modules
  if ((has_nav || has_time)) {
    nav_time = true;
  }

  // Check if config has the Nav/Time module
  if (has_navTime) {
    navTime = true;
  }

  // Check if there are any Rotation conflicts
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

  // Check if there are any Translation conflicts
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

  // Check if there are any Throttle conflicts
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
  if (isSizeMismatch || (hasRotation && !hasThrottle) || (hasRotation && !hasTranslation) || (!hasRotation && hasTranslation) || translation_duplicate || rotation_duplicate || throttle_duplicate || separated_analog || executive_duplicate || (nav_time && navTime) || controlsys_duplicate || telemetry_overload) {
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
  if (separated_analog) {
    recommendation += `<p style="color: #ffe600;">The Rotation and Translation modules must be in the same container.</p>`;
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
    recommendation += `<p style="color: #ffe600;">You are using the Telemetry module with another module that needs data from Simpit. This will result in the second module's displays not updating properly. Please use multiple containers instead.</p>`;
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

  // Activate the button
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