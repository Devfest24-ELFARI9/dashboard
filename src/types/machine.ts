export interface WeldingRobotData {
    machine_id: string;
    weld_temperature: number; // °C
    weld_current: number; // A
    weld_voltage: number; // V
    weld_time: number; // ms
    pressure_applied: number; // N
    arm_position: { x: number; y: number; z: number };
    wire_feed_rate: number; // mm/min
    gas_flow_rate: number; // l/min
    weld_strength_estimate: number; // N
    vibration_level: number; // mm/s
    power_consumption: number; // kWh
    timestamp: string;
  }
  
export interface StampingPressData {
    machine_id: string;
    force_applied: number; // tons
    cycle_time: number; // seconds
    temperature: number; // °C
    vibration_level: number; // mm/s
    cycle_count: number; // count of cycles
    oil_pressure: number; // bar
    die_alignment: string; // status
    sheet_thickness: number; // mm
    power_consumption: number; // kWh
    noise_level: number; // dB
    lubrication_flow_rate: number; // ml/min
    timestamp: string;
  }
  
export interface PaintingRobotData {
    machine_id: string;
    spray_pressure: number; // bar
    paint_thickness: number; // μm
    arm_position: { x: number; y: number; z: number };
    temperature: number; // °C
    humidity: number; // %RH
    paint_flow_rate: number; // ml/min
    paint_volume_used: number; // liters
    atomizer_speed: number; // RPM
    overspray_capture_efficiency: number; // %
    booth_airflow_velocity: number; // m/s
    solvent_concentration: number; // %
    timestamp: string;
  }
  
 export  interface AGVData {
    machine_id: string;
    location: { x: number; y: number; z: number };
    battery_level: number; // %
    load_weight: number; // kg
    speed: number; // m/s
    distance_traveled: number; // meters
    obstacle_detection: string; // yes or no
    navigation_status: string; // en_route, waiting, rerouting
    vibration_level: number; // mm/s
    temperature: number; // °C
    wheel_rotation_speed: number; // RPM
    timestamp: string;
  }
  
  export interface CNCMillingData {
    machine_id: string;
    spindle_speed: number; // RPM
    tool_wear_level: number; // %
    cut_depth: number; // mm
    feed_rate: number; // mm/min
    vibration_level: number; // mm/s
    coolant_flow_rate: number; // ml/min
    material_hardness: number; // HB
    power_consumption: number; // kWh
    temperature: number; // °C
    chip_load: number; // mm
    timestamp: string;
  }
  
  export interface LeakTestData {
    machine_id: string;
    test_pressure: number; // bar
    pressure_drop: number; // bar
    leak_rate: number; // ml/min
    test_duration: number; // seconds
    temperature: number; // °C
    status: string; // pass or fail
    fluid_type: string; // type of fluid
    seal_condition: string; // good, warning, or fail
    test_cycle_count: number; // number of cycles
    timestamp: string;
  }
  
  // Union type for all machine data
  export type MachineSensorData =
    | WeldingRobotData
    | StampingPressData
    | PaintingRobotData
    | AGVData
    | CNCMillingData
    | LeakTestData;
  