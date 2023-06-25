var moduleData = [
    {
        name: "Abort Module",
        id: "a1",
        price: 60,
        image: "modules/abort.png",
        image_light: "modules/light/abort_l.png",
        tooltip: "The Abort module has a single button, an LED indicator, and an activation safety switch. The button remains inactive unless the safety switch is flipped on. The LED indicates the state of the safety switch. Pressing the button will activate the Abort action group."
    },
    {
        name: "Stage Module",
        id: "a2",
        price: 60,
        image: "modules/stage.png",
        image_light: "modules/light/stage_l.png",
        tooltip: "The Stage module has a single button, an LED indicator, and an activation safety switch. The button remains inactive unless the safety switch is flipped on. The LED indicates the state of the safety switch. Pressing the button will activate the Stage action group."
    },
    {
        name: "Executive Actions Module",
        id: "a3",
        price: 60,
        image: "modules/exec1.png",
        image_light: "modules/light/exec1_l.png",
        tooltip: "The Executive Actions module combines the functions of the Stage and Abort modules into one. It features two LED indicators (one built into the Abort button) and an arming switch that requires the user to insert and turn a key to activate. The Abort button is covered by a plastic safety cover."
    },
    {
        name: "Executive Actions Module (Groups)",
        id: "a4",
        price: 80,
        image: "modules/exec2.png",
        image_light: "modules/light/exec2_l.png",
        tooltip: "The Executive Actions (Groups) module combines the functions of the Executive Actions module with some of the features of the Action Groups module. Two buttons, activated by a safety key switch, control the Stage and Abort groups, with an LED indicator built into the Abort button and covered by a plastic safety cover. Five buttons control the Action Groups, each with an LED indicator. The Action Group mappings can be changed upon request."
    },
    {
        name: "Executive Actions Module (Control)",
        id: "a5",
        price: 80,
        image: "modules/exec3.png",
        image_light: "modules/light/exec3_l.png",
        tooltip: "The Executive Actions (Control) module combines the functions of the Executive Actions module with some of the features of the Control Systems module. Two buttons, activated by a safety key switch, control the Stage and Abort groups, with an LED indicator built into the Abort button and covered by a plastic safety cover. Two Action Group buttons with LED indicators control the Gear and Lights action groups, while two switches toggle the SAS and RCS. Another button reactivates the SAS Hold mode for quick refreshing of the SAS.			"
    },
    {
        name: "Time Module",
        id: "b1",
        price: 80,
        image: "modules/time.png",
        image_light: "modules/light/time_l.png",
        tooltip: "The Time module manages the timewarp functions of the game. A large rocker switch allows you to step up/down timewarp speeds. A button with an LED indicator lights up if the game is in timewarp, and pressing it will cancel timewarp. Physical timewarp can be activated by holding a button and pressing the large rocker. Another button allows you to warp directly to the next maneuver node. Three more buttons allow you to pause, quicksave, and load the last quicksave. Note: This module is only available for Windows."
    },
    {
        name: "Navigation Module",
        id: "b2",
        price: 70,
        image: "modules/nav1.png",
        image_light: "modules/light/nav1_l.png",
        tooltip: "The Navigation module manages the map and navball. Two large toggle switches activate/decativate the Map/Navball and light up slightly while on. The rest of the buttons allow you to change views while in map mode, change the navball mode (orbit/surface/target) or switch between nearby vessels. Note: This module is only available for Windows."
    },
    {
        name: "Navigation Module (Time)",
        id: "b3",
        price: 80,
        image: "modules/nav2.png",
        image_light: "modules/light/nav2_l.png",
        tooltip: "The Navigation (Time) module combines some of the features of the Navigation module and the Time module. A large switch toggles the Map and lights up slightly while on. A large rocker switch allows you to step up/down timewarp speeds. A button with an LED indicator lights up if the game is in timewarp, and pressing it will cancel timewarp. Physical timewarp can be activated by holding a button and pressing the large rocker. Other buttons handle Pause, Cycle Ship, and Reset Map Focus. Note: This module is only available for Windows."
    },
    {
        name: "Telemetry Module",
        id: "c1",
        price: 80,
        image: "modules/telem.png",
        image_light: "modules/light/telem_l.png",
        tooltip: "The Telemetry module features a large LCD screen that provides a ton of data regarding the status of the current vessel. Four buttons allow the user to select which display mode is currently active. Please note that the large amounts of data being sent to the controller have a tendency to overload controllers that use this module with other display modules (currently Control Systems, Action Groups, and the Stop Timewarp button LED). The buttons on these modules should still work as intended, but the LED indicators might not always update properly."
    },
    {
        name: "Blank Module Cover",
        id: "i1",
        price: 0,
        image: "modules/blank.png",
        tooltip: "Blank module covers can be useful if you want to have a larger container without needing to fill it with modules, or if you know you eventually want to fill it but don't yet have the means to do so. For an additional $10 you can have an image or text engraved onto the surface."
    },
    {
        name: "Blank Module Cover",
        id: "i2",
        price: 0,
        image: "modules/blank-agency.png",
        tooltip: "Blank module covers can be useful if you want to have a larger container without needing to fill it with modules, or if you know you eventually want to fill it but don't yet have the means to do so. For an additional $10 you can have an image or text engraved onto the surface."
    },
    {
        name: "Blank Module Cover",
        id: "i3",
        price: 0,
        image: "modules/blank-logo.png",
        tooltip: "Blank module covers can be useful if you want to have a larger container without needing to fill it with modules, or if you know you eventually want to fill it but don't yet have the means to do so. For an additional $10 you can have an image or text engraved onto the surface."
    },
    {
        name: "Analog Controls Module",
        id: "f1",
        price: 90,
        image: "modules/analog2.png",
        tooltip: "The Analog Controls module roughly combines the functionality of the Rotation and Translation Controls modules. It is incompatible with those modules. It features a large 3-axis joystick that controls the pitch/yaw/roll or the x/y/z impulse of the craft depending on the state of a Mode toggle switch. Another Mode switch remaps the joystick control depending on the craft for more intuitive gameplay. The joystick button sets the trim, and the brakes can be held with the button. The brakes can also be locked on by pressing the brake button and then pressing the joystick button. Another toggle switch controls the Gear action group."
    },
    {
        name: "Analog Controls Module (Throttle)",
        id: "f2",
        price: 90,
        image: "modules/analog1.png",
        tooltip: "The Analog Controls module (Throttle) roughly combines the functionality of the Rotation and Translation Controls modules and Throttle module. It is incompatible with those modules. It features a large 3-axis joystick that controls the pitch/yaw/roll or the x/y/z impulse of the craft depending on the state of a Mode toggle switch. Another Mode switch remaps the joystick control depending on the craft for more intuitive gameplay. A dial controls the throttle. The joystick button sets the trim, and the brakes can be held with the button. The brakes can also be locked on by pressing the brake button and then pressing the joystick button."
    },
    {
        name: "Rotation Controls Module",
        id: "f3",
        price: 90,
        image: "modules/rot2.png",
        tooltip: "The Rotation Controls module is intended to be used together with the Translation Controls module. It features a large 3-axis joystick that controls the pitch/yaw/roll of the craft. A mode switch remaps the axes depending on the type of craft to lead to more intuitive gameplay. The joystick button and trim button allow you to set the trim per axis. Two other switches toggle the Light and Gear action groups."
    },
    {
        name: "Rotation Controls Module (Throttle)",
        id: "f4",
        price: 90,
        image: "modules/rot1.png",
        tooltip: "The Rotation Controls (Throttle) module is intended to be used together with the Translation Controls module. It features a large 3-axis joystick that controls the pitch/yaw/roll of the craft. A mode switch remaps the axes depending on the type of craft to lead to more intuitive gameplay. The joystick button and trim button allow you to set the trim per axis. It also features a dial for controlling the throttle, with an enable switch for quick on/off or for safety."
    },
    {
        name: "Translation Controls Module",
        id: "f5",
        price: 90,
        image: "modules/trans.png",
        tooltip: "The Translation Controls module is intended to be used together with the Rotation Controls module. It features a large 3-axis joystick that controls the x/y/z impulse of the craft, such as during docking. It also controls the wheels while in Rover mode. Also while in Rover mode, a cruise control function allows you to set a speed for the craft to maintain. Brakes and Brake Lock inputs allow you to press and hold or toggle on/off the brakes respectively. A toggle switch for Precision Control reduces the translation and rotation inputs by 80%, allowing you to more accurately insert into an orbit."
    },
    {
        name: "Throttle Module",
        id: "f6",
        price: 60,
        image: "modules/throt.png",
        tooltip: "The Throttle module features a large rotating lever that smoothly controls the throttle. It also includes a toggle switch for enabling/disabling the throttle or choosing a throttle-specific precision mode, as well as buttons for quick max/min throttle."
    },
    {
        name: "Control Systems Module",
        id: "g1",
        price: 90,
        image: "modules/control.png",
        image_light: "modules/light/control_l.png",
        tooltip: "The Control Systems module manages the SAS and RCS of the ship. Two toggle switches activate the SAS and RCS, and 10 buttons, each with an LED indicator, select the active SAS mode. The buttons come with stickers to denote which mode they activate."
    },
    {
        name: "Action Groups Module",
        id: "h1",
        price: 90,
        image: "modules/ag1.png",
        image_light: "modules/light/ag1_l.png",
        tooltip: "The Action Groups module consists of 10 pushbuttons, each with an LED indicator. The buttons activate Action Groups 1-10, and the LED indicators determine the states of the action groups.  When switching between different crafts, the indicators will change depending on that craft's specific active action groups. The empty space in the center leaves room for stickers or can be drawn on with a dry-erase marker for labeling."
    },
    {
        name: "Action Groups Module (11-20)",
        id: "h2",
        price: 90,
        image: "modules/ag2.png",
        image_light: "modules/light/ag2_l.png",
        tooltip: "The Action Groups (11-20) module consists of 10 pushbuttons, each with an LED indicator. The buttons activate Action Groups 11-20, and the LED indicators determine the states of the action groups.  When switching between different crafts, the indicators will change depending on that craft's specific active action groups, though there are some bugs when switching between craft that do not have anything mapped to Groups 11-20. The empty space in the center leaves room for stickers or can be drawn on with a dry-erase marker for labeling."
    },
    {
        name: "Action Groups Module (21-30)",
        id: "h3",
        price: 90,
        image: "modules/ag3.png",
        image_light: "modules/light/ag3_l.png",
        tooltip: "The Action Groups (21-30) module consists of 10 pushbuttons, each with an LED indicator. The buttons activate Action Groups 21-30, and the LED indicators determine the states of the action groups.  When switching between different crafts, the indicators will change depending on that craft's specific active action groups, though there are some bugs when switching between craft that do not have anything mapped to Groups 21-30. The empty space in the center leaves room for stickers or can be drawn on with a dry-erase marker for labeling."
    },
    {
        name: "Camera Module",
        id: "e1",
        price: 70,
        image: "modules/camera.png",
        tooltip: "The Camera module allows you to change the view and position of the camera. The white buttons control the camera angle, and the rest of the buttons toggle the UI, take a screenshot, toggle IVA view, and cycle the camera modes. Note: This module is only available for Windows."
    },
    {
        name: "EVA Module",
        id: "d1",
        price: 80,
        image: "modules/eva.png",
        image_light: "modules/light/eva_l.png",
        tooltip: "The EVA module controls Kerbals while on EVA. It provides dedicated inputs for walking/flying, and it includes buttons for the other EVA functions. Parachute deployment can be achieved by pressing both the Jump and Light buttons at the same time. It also features a Monopropellant fuel gauge to show the current fuel level of the kerbal's jetpack. Note: This module is only available for Windows."
    }
];

// Get the container element where the modules will be added
const moduleContainer_left = document.querySelector('.left-module-array');
const moduleContainer_right = document.querySelector('.right-module-array');
let moduleCounter = 0;

// Iterate over the moduleData array
moduleData.forEach(module => {
    // Create the module element
    const moduleDock = document.createElement('div');
    moduleDock.classList.add('module-dock');
    moduleDock.setAttribute('data-type', 'type2');
    
    const moduleElement = document.createElement('div');
    moduleElement.classList.add('draggable');
    moduleElement.setAttribute('draggable', 'true');

    // Set the module ID, price, and name
    moduleElement.setAttribute('id', module.id);
    moduleElement.setAttribute('data-price', module.price);
    moduleElement.setAttribute('data-name', module.name);

    // Create the module image element
    const moduleImage = document.createElement('img');
    moduleImage.src = module.image;
    moduleImage.classList.add('image-1');
    moduleElement.appendChild(moduleImage);

    // Check if the module has the image_light property
    if (module.image_light) {
        const moduleImageLight = document.createElement('img');
        moduleImageLight.src = module.image_light;
        moduleImageLight.classList.add('image-2');
        moduleImageLight.classList.add('hidden');
        moduleElement.appendChild(moduleImageLight);
        moduleElement.classList.add('light');
    }

    // Create the module tooltip element
    const moduleTooltip = document.createElement('span');
    moduleTooltip.style.fontFamily = "Roboto, sans-serif";
    moduleTooltip.classList.add('tooltip');

    // Create the module tooltip content
    const moduleTooltipContent = document.createElement('strong');
    moduleTooltipContent.style.fontSize = '1.8vh';
    moduleTooltipContent.textContent = module.name;

    const modulePrice = document.createElement('span');
    modulePrice.style.fontSize = '1.7vh';
    modulePrice.innerHTML = `<br>$${module.price}</br>`;

    const moduleDescription = document.createElement('span');
    moduleDescription.innerHTML = module.tooltip;

    

    moduleTooltip.appendChild(moduleTooltipContent);
    moduleTooltip.appendChild(modulePrice);
    moduleTooltip.appendChild(moduleDescription);

    moduleElement.appendChild(moduleTooltip);
    moduleDock.appendChild(moduleElement);

    // Append the module element to the container
    if (moduleCounter < 12) {
        moduleContainer_left.appendChild(moduleDock);
    } else {
        moduleContainer_right.appendChild(moduleDock);
    }
    moduleCounter += 1;
});