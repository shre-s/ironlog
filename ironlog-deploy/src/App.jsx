import { useState, useEffect, useRef, useCallback } from "react";

const ALL_EX = [
  { id:"db_bench", name:"Flat DB Bench Press", cat:"chest" },
  { id:"barbell_bench", name:"Barbell Bench Press", cat:"chest" },
  { id:"low_incline_press", name:"Low Incline Barbell Press", cat:"chest" },
  { id:"cable_flye", name:"Cable Flye", cat:"chest" },
  { id:"pec_deck", name:"Pec Deck", cat:"chest" },
  { id:"dip_chest", name:"Weighted Dip (Chest)", cat:"chest" },
  { id:"pullup", name:"Pull-Up / Chin-Up", cat:"back" },
  { id:"lat_pulldown", name:"Lat Pulldown", cat:"back" },
  { id:"db_row", name:"DB Row", cat:"back" },
  { id:"pendlay_row", name:"Pendlay Row", cat:"back" },
  { id:"helms_row", name:"Helms Row", cat:"back" },
  { id:"face_pull", name:"Face Pull", cat:"back" },
  { id:"cable_row", name:"Seated Cable Row", cat:"back" },
  { id:"cross_body_lat", name:"Cross-Body Lat Pull-Around", cat:"back" },
  { id:"inverted_row", name:"Inverted Row", cat:"back" },
  { id:"db_shoulder_press", name:"DB Shoulder Press", cat:"shoulders" },
  { id:"cable_lateral_raise", name:"Cable Lateral Raise", cat:"shoulders" },
  { id:"db_lateral_raise", name:"DB Lateral Raise", cat:"shoulders" },
  { id:"ytw_raise", name:"YTW Raises", cat:"shoulders" },
  { id:"cable_reverse_flye", name:"Cable Reverse Flye", cat:"shoulders" },
  { id:"external_rotation", name:"Cable External Rotation", cat:"shoulders" },
  { id:"squat", name:"Back Squat", cat:"legs" },
  { id:"front_squat", name:"Front Squat", cat:"legs" },
  { id:"hack_squat", name:"Hack Squat", cat:"legs" },
  { id:"leg_press", name:"Leg Press", cat:"legs" },
  { id:"rdl", name:"Romanian Deadlift", cat:"legs" },
  { id:"db_rdl", name:"DB Romanian Deadlift", cat:"legs" },
  { id:"leg_curl", name:"Lying Leg Curl", cat:"legs" },
  { id:"nordic_curl", name:"Nordic Ham Curl", cat:"legs" },
  { id:"leg_extension", name:"Leg Extension", cat:"legs" },
  { id:"bulgarian_split", name:"Bulgarian Split Squat", cat:"legs" },
  { id:"goblet_squat", name:"Goblet Squat", cat:"legs" },
  { id:"calf_raise", name:"Calf Raise", cat:"legs" },
  { id:"box_jump", name:"Box Jump", cat:"legs" },
  { id:"lateral_bound", name:"Lateral Bound", cat:"legs" },
  { id:"pistol_squat", name:"Pistol Squat", cat:"legs" },
  { id:"deadlift", name:"Deadlift", cat:"glutes" },
  { id:"hip_thrust", name:"Barbell Hip Thrust", cat:"glutes" },
  { id:"db_hip_thrust", name:"Single-Leg DB Hip Thrust", cat:"glutes" },
  { id:"copenhagen_adduction", name:"Copenhagen Hip Adduction", cat:"glutes" },
  { id:"cable_hip_abduction", name:"Cable Hip Abduction", cat:"glutes" },
  { id:"glute_ham_raise", name:"Glute-Ham Raise", cat:"glutes" },
  { id:"reverse_hyper", name:"Reverse Hyper", cat:"glutes" },
  { id:"db_curl", name:"DB Curl", cat:"arms" },
  { id:"hammer_curl", name:"Hammer Curl", cat:"arms" },
  { id:"preacher_curl", name:"Preacher Curl", cat:"arms" },
  { id:"bayesian_curl", name:"Bayesian Cable Curl", cat:"arms" },
  { id:"reverse_ez_curl", name:"Reverse Grip EZ-Bar Curl", cat:"arms" },
  { id:"overhead_tricep_ext", name:"Overhead Cable Tricep Extension", cat:"arms" },
  { id:"skull_crusher", name:"DB Skull Crusher", cat:"arms" },
  { id:"tricep_pressdown", name:"Tricep Pressdown", cat:"arms" },
  { id:"wrist_curl", name:"DB Wrist Curl", cat:"arms" },
  { id:"pallof_press", name:"Pallof Press", cat:"core" },
  { id:"cable_crunch", name:"Cable Crunch", cat:"core" },
  { id:"ab_wheel", name:"Ab Wheel Rollout", cat:"core" },
  { id:"hanging_leg_raise", name:"Hanging Leg Raise", cat:"core" },
  { id:"plank", name:"Long-Lever Plank", cat:"core" },
  { id:"cable_woodchop", name:"Cable Wood Chop", cat:"core" },
  { id:"l_sit", name:"L-Sit", cat:"core" },
  { id:"med_ball_rotational", name:"Med Ball Rotational Throw", cat:"athletic" },
  { id:"lateral_band_walk", name:"Lateral Band Walk", cat:"athletic" },
  { id:"rotator_cuff_er", name:"Rotator Cuff External Rotation", cat:"athletic" },
  { id:"single_leg_balance", name:"Single-Leg Balance", cat:"athletic" },
  { id:"agility_ladder", name:"Agility Ladder Drills", cat:"athletic" },
  { id:"sprint_lateral", name:"Lateral Shuffle Sprint", cat:"athletic" },
  { id:"depth_jump", name:"Depth Jump", cat:"athletic" },
  { id:"pullup_bw", name:"Pull-Up (BW)", cat:"calisthenics" },
  { id:"pushup_bw", name:"Push-Up", cat:"calisthenics" },
  { id:"dip_bw", name:"Dip", cat:"calisthenics" },
  { id:"pike_pushup", name:"Pike Push-Up", cat:"calisthenics" },
  { id:"muscle_up", name:"Muscle-Up Progression", cat:"calisthenics" },
  { id:"handstand", name:"Handstand Progression", cat:"calisthenics" },
];

const getN = (id) => ALL_EX.find(e=>e.id===id)?.name || id;
const CATS = [...new Set(ALL_EX.map(e=>e.cat))];

const PROGRAMS = [
{
  id:"tennis_2x", name:"Tennis Foundation", cat:"tennis", emoji:"🎾",
  days:2, weeks:8, level:"Beginner", source:"Tennis Fitness Science",
  tagline:"Build the athletic base every tennis player needs",
  desc:"Bilateral strength, rotational power, shoulder health, injury prevention. Perfect for players starting strength training.",
  goals:["Court movement","Injury prevention","Serve power","Foundation strength"],
  sched:["Full Body A","Rest","Rest","Full Body B","Rest","Rest","Rest"],
  workouts:{
    "Full Body A":{focus:"Power & Bilateral Strength",exs:[
      {id:"goblet_squat",sets:3,reps:"8-10",rpe:"7-8",rir:"3-2",rest:"2 min",notes:"Knee tracking, proud chest"},
      {id:"rdl",sets:3,reps:"8-10",rpe:"7-8",rir:"3-2",rest:"2 min",notes:"Hip hinge, neutral spine"},
      {id:"db_bench",sets:3,reps:"8-12",rpe:"7-8",rir:"3-2",rest:"90 sec",notes:"Full ROM"},
      {id:"db_row",sets:3,reps:"10-12",rpe:"7-8",rir:"3-2",rest:"90 sec",notes:"Each arm, 45° elbow"},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"🎾 Critical shoulder health"},
      {id:"pallof_press",sets:3,reps:"10-12",rpe:"8",rir:"2",rest:"60 sec",notes:"Anti-rotation, slow"},
      {id:"calf_raise",sets:3,reps:"15-20",rpe:"8",rir:"2",rest:"60 sec",notes:"Full stretch at bottom"},
    ]},
    "Full Body B":{focus:"Explosivity & Athletic Movement",exs:[
      {id:"box_jump",sets:4,reps:"4-5",rpe:"8",rir:"2",rest:"2 min",notes:"Land softly, reset each rep"},
      {id:"lateral_bound",sets:3,reps:"6/side",rpe:"8",rir:"2",rest:"90 sec",notes:"🎾 Stick landing 2 sec"},
      {id:"med_ball_rotational",sets:3,reps:"8/side",rpe:"8",rir:"2",rest:"90 sec",notes:"🎾 Hip-to-shoulder = serve pattern"},
      {id:"bulgarian_split",sets:3,reps:"8-10/leg",rpe:"8",rir:"2",rest:"2 min",notes:"Unilateral stability"},
      {id:"rotator_cuff_er",sets:3,reps:"15/arm",rpe:"7",rir:"3",rest:"60 sec",notes:"🎾 Rotator cuff health"},
      {id:"lat_pulldown",sets:3,reps:"10-12",rpe:"8",rir:"2",rest:"90 sec",notes:"Elbows down and in"},
      {id:"plank",sets:3,reps:"30-45 sec",rpe:"8",rir:"2",rest:"60 sec",notes:"Long lever, brace hard"},
    ]},
  }
},
{
  id:"tennis_4x", name:"Tennis Performance", cat:"tennis", emoji:"🎾",
  days:4, weeks:8, level:"Intermediate", source:"Tennis Fitness Science",
  tagline:"Upper/Lower targeting all 9 tennis physical threads",
  desc:"Bilateral strength, rotational control, force absorption, explosive power, unilateral stability, repeated power, multi-directional speed.",
  goals:["Serve mph","Court coverage","Rotational power","Shoulder health"],
  sched:["Upper A","Lower A","Rest","Upper B","Lower B","Rest","Rest"],
  workouts:{
    "Upper A":{focus:"Push + Rotational Power",exs:[
      {id:"db_shoulder_press",sets:3,reps:"8-10",rpe:"8",rir:"2",rest:"2 min",notes:"Overhead strength for serve"},
      {id:"low_incline_press",sets:3,reps:"8-10",rpe:"8",rir:"2",rest:"2 min",notes:"Pec stretch, bottom half ROM"},
      {id:"med_ball_rotational",sets:4,reps:"8/side",rpe:"9",rir:"1",rest:"90 sec",notes:"🎾 Explosive hip-shoulder"},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"🎾 Every upper session"},
      {id:"cable_lateral_raise",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"60 sec",notes:"Squeeze lateral delt"},
      {id:"external_rotation",sets:3,reps:"15/arm",rpe:"7",rir:"3",rest:"60 sec",notes:"🎾 Injury prevention"},
    ]},
    "Lower A":{focus:"Power + Explosivity",exs:[
      {id:"squat",sets:3,reps:"5-6",rpe:"8",rir:"2",rest:"3 min",notes:"Court movement power base"},
      {id:"box_jump",sets:4,reps:"4",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Max height, soft landing"},
      {id:"lateral_bound",sets:4,reps:"5/side",rpe:"9",rir:"1",rest:"2 min",notes:"🎾 Court lateral power"},
      {id:"rdl",sets:3,reps:"8-10",rpe:"8",rir:"2",rest:"2 min",notes:"Hamstring deceleration"},
      {id:"calf_raise",sets:4,reps:"15-20",rpe:"9",rir:"1",rest:"60 sec",notes:"🎾 Split-step demands"},
      {id:"lateral_band_walk",sets:3,reps:"15/side",rpe:"8",rir:"2",rest:"60 sec",notes:"Hip abductor health"},
    ]},
    "Upper B":{focus:"Pull + Shoulder Health",exs:[
      {id:"pullup",sets:3,reps:"6-10",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Full ROM dead hang"},
      {id:"db_row",sets:3,reps:"10-12/arm",rpe:"8",rir:"2",rest:"90 sec",notes:"Drive elbow 45° back"},
      {id:"face_pull",sets:3,reps:"15-20",rpe:"8",rir:"2",rest:"60 sec",notes:"Rear delt + rotator cuff"},
      {id:"cable_reverse_flye",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"60 sec",notes:"Rear delt isolation"},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"🎾 Shoulder armor"},
      {id:"wrist_curl",sets:2,reps:"15-20/arm",rpe:"8",rir:"2",rest:"45 sec",notes:"🎾 Tennis elbow prevention"},
      {id:"reverse_ez_curl",sets:2,reps:"12-15",rpe:"8",rir:"2",rest:"45 sec",notes:"Forearm balance"},
    ]},
    "Lower B":{focus:"Stability + Unilateral",exs:[
      {id:"bulgarian_split",sets:3,reps:"8-10/leg",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"🎾 Split-step mechanics"},
      {id:"depth_jump",sets:3,reps:"5",rpe:"9",rir:"1",rest:"2 min",notes:"Reactive strength"},
      {id:"db_rdl",sets:3,reps:"10-12",rpe:"8",rir:"2",rest:"90 sec",notes:""},
      {id:"copenhagen_adduction",sets:3,reps:"10-12/side",rpe:"8",rir:"2",rest:"60 sec",notes:"🎾 Groin injury prevention"},
      {id:"single_leg_balance",sets:3,reps:"30 sec/leg",rpe:"7",rir:"3",rest:"45 sec",notes:"Eyes closed progression"},
      {id:"cable_woodchop",sets:3,reps:"10/side",rpe:"8",rir:"2",rest:"60 sec",notes:"🎾 Rotational core"},
    ]},
  }
},
{
  id:"tennis_6x", name:"Tennis Elite", cat:"tennis", emoji:"🎾",
  days:6, weeks:12, level:"Advanced", source:"Tennis Fitness Science + RP Strength",
  tagline:"Six-day PPL with dedicated athletic conditioning day",
  desc:"PPL with tennis athletic conditioning. RP Strength mesocycle progression (MEV→MRV). Three 4-week mesocycles over 12 weeks.",
  goals:["Peak athletic performance","All-around tennis fitness","High-volume adaptation"],
  sched:["Push","Pull","Legs","Tennis Athletic","Upper","Lower","Rest"],
  workouts:{
    "Push":{focus:"Chest, Shoulders, Triceps",exs:[
      {id:"low_incline_press",sets:"3-4",reps:"8-10",rpe:"8-9",rir:"2-1",rest:"2-3 min",notes:"MEV→MRV: add 1 set/week"},
      {id:"db_shoulder_press",sets:"3-4",reps:"10-12",rpe:"8-9",rir:"2-1",rest:"2 min",notes:""},
      {id:"cable_flye",sets:"2-3",reps:"12-15",rpe:"9",rir:"1",rest:"90 sec",notes:"Stretch-focused"},
      {id:"cable_lateral_raise",sets:"3-4",reps:"12-15",rpe:"9-10",rir:"1-0",rest:"60 sec",notes:"Last set to failure"},
      {id:"overhead_tricep_ext",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"90 sec",notes:"Long head stretch"},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"🎾 Every push session"},
    ]},
    "Pull":{focus:"Back, Biceps, Rear Delts",exs:[
      {id:"pullup",sets:"3-4",reps:"6-10",rpe:"9",rir:"1",rest:"2-3 min",notes:"Weighted when 10 easy"},
      {id:"pendlay_row",sets:"3-4",reps:"6-8",rpe:"8-9",rir:"2-1",rest:"2-3 min",notes:"Explosive concentric"},
      {id:"cross_body_lat",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"90 sec",notes:"Integrated partials all sets"},
      {id:"face_pull",sets:3,reps:"15-20",rpe:"8",rir:"2",rest:"60 sec",notes:"Rear delt health"},
      {id:"db_curl",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"75 sec",notes:"2-3 sec eccentric"},
      {id:"external_rotation",sets:2,reps:"15/arm",rpe:"7",rir:"3",rest:"45 sec",notes:"🎾 Rotator cuff"},
    ]},
    "Legs":{focus:"Quads, Hamstrings, Glutes, Calves",exs:[
      {id:"squat",sets:"3-4",reps:"6-8",rpe:"8",rir:"2",rest:"3-5 min",notes:"Low RPE - high muscle damage"},
      {id:"rdl",sets:"3-4",reps:"8-10",rpe:"8",rir:"2",rest:"2-3 min",notes:"Bottom 3/4 ROM for tension"},
      {id:"leg_press",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"2 min",notes:"Feet low, quad focus"},
      {id:"nordic_curl",sets:"2-3",reps:"5-8",rpe:"8",rir:"2",rest:"2 min",notes:"🎾 Hamstring injury prevention"},
      {id:"calf_raise",sets:"3-4",reps:"12-15",rpe:"9",rir:"1",rest:"60 sec",notes:"1-2 sec pause at bottom"},
      {id:"lateral_band_walk",sets:2,reps:"15/side",rpe:"8",rir:"2",rest:"60 sec",notes:"Hip health"},
    ]},
    "Tennis Athletic":{focus:"Court Conditioning + Explosive Power",exs:[
      {id:"box_jump",sets:4,reps:"4-5",rpe:"9",rir:"1",rest:"2 min",notes:"Max effort each rep"},
      {id:"lateral_bound",sets:4,reps:"5/side",rpe:"9",rir:"1",rest:"2 min",notes:"🎾 Stick each landing"},
      {id:"depth_jump",sets:3,reps:"5",rpe:"9",rir:"1",rest:"2 min",notes:"Reactive strength"},
      {id:"med_ball_rotational",sets:4,reps:"8/side",rpe:"9",rir:"1",rest:"90 sec",notes:"🎾 Serve/groundstroke pattern"},
      {id:"agility_ladder",sets:4,reps:"30 sec",rpe:"9",rir:"1",rest:"60 sec",notes:"🎾 Footwork patterns"},
      {id:"sprint_lateral",sets:6,reps:"10m",rpe:"10",rir:"0",rest:"90 sec",notes:"🎾 Court-width speed"},
      {id:"pallof_press",sets:3,reps:"10/side",rpe:"8",rir:"2",rest:"60 sec",notes:"Anti-rotation core"},
    ]},
    "Upper":{focus:"Full Upper Body",exs:[
      {id:"db_bench",sets:3,reps:"8-10",rpe:"8-9",rir:"2-1",rest:"2 min",notes:""},
      {id:"helms_row",sets:3,reps:"10-12",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Touch chest on each rep"},
      {id:"db_shoulder_press",sets:"2-3",reps:"10-12",rpe:"8-9",rir:"2-1",rest:"90 sec",notes:""},
      {id:"cable_reverse_flye",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"60 sec",notes:"Pre-stretch rear delt"},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"🎾 Shoulder armor"},
      {id:"skull_crusher",sets:2,reps:"10-12",rpe:"9",rir:"1",rest:"75 sec",notes:""},
      {id:"hammer_curl",sets:2,reps:"10-12",rpe:"9",rir:"1",rest:"75 sec",notes:""},
    ]},
    "Lower":{focus:"Athletic Lower Body",exs:[
      {id:"bulgarian_split",sets:"3-4",reps:"8-10/leg",rpe:"9",rir:"1",rest:"2 min",notes:"🎾 Split-step strength"},
      {id:"hack_squat",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"2 min",notes:"Bottom half ROM"},
      {id:"leg_curl",sets:3,reps:"10-12",rpe:"9",rir:"1",rest:"90 sec",notes:"Lean forward for stretch"},
      {id:"db_hip_thrust",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"90 sec",notes:"Squeeze hard at top"},
      {id:"cable_hip_abduction",sets:3,reps:"12-15/side",rpe:"9",rir:"1",rest:"60 sec",notes:"🎾 Groin health"},
      {id:"copenhagen_adduction",sets:3,reps:"10/side",rpe:"8",rir:"2",rest:"60 sec",notes:"Injury prevention"},
    ]},
  }
},
{
  id:"nippard_essentials_2x", name:"Nippard Essentials 2x", cat:"nippard", emoji:"💪",
  days:2, weeks:12, level:"All Levels", source:"Jeff Nippard – Essentials Program",
  tagline:"45-minute full body workouts. No fluff, only essentials.",
  desc:"Low volume, high intensity. Beat the logbook each session. Dropsets on isolation exercises. RPE-based autoregulation.",
  goals:["Build muscle efficiently","Strength progression","45-min sessions"],
  sched:["Full Body","Rest","Rest","Full Body","Rest","Rest","Rest"],
  workouts:{
    "Full Body":{focus:"Compound-first, 45 minutes",exs:[
      {id:"leg_press",sets:2,reps:"4-6",rpe:"8-9",rir:"2-1",rest:"3 min",notes:"Heavy — beat the logbook"},
      {id:"db_bench",sets:2,reps:"8-10",rpe:"9",rir:"1",rest:"3 min",notes:"Last set: dropset ×10-12 reps"},
      {id:"db_rdl",sets:2,reps:"10-12",rpe:"9",rir:"1",rest:"2 min",notes:"Control negative, hip hinge"},
      {id:"db_row",sets:2,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"2 min",notes:"45° elbow, strict form"},
      {id:"db_shoulder_press",sets:2,reps:"8-10",rpe:"9-10",rir:"1-0",rest:"2 min",notes:"Last set: dropset"},
      {id:"db_curl",sets:1,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"90 sec",notes:"Dropset: -50% × 10-12"},
      {id:"skull_crusher",sets:1,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"90 sec",notes:"Feel stretch in triceps"},
    ]},
  }
},
{
  id:"nippard_essentials_3x", name:"Nippard Essentials 3x", cat:"nippard", emoji:"💪",
  days:3, weeks:12, level:"All Levels", source:"Jeff Nippard – Essentials Program (3x/week)",
  tagline:"Full Body / Upper / Lower. 45-min sessions, science-based.",
  desc:"Three 4-week blocks. Full Body / Upper / Lower split. Beat the logbook emphasis. DB and machine focus for time efficiency. Dropsets weeks 9–12.",
  goals:["Time-efficient hypertrophy","Strength progression","Balanced 3-day split"],
  sched:["Full Body","Rest","Upper","Rest","Lower","Rest","Rest"],
  workouts:{
    "Full Body":{focus:"Compound-first, under 45 min",exs:[
      {id:"leg_press",sets:2,reps:"4-6",rpe:"8-9",rir:"2-1",rest:"3 min",notes:"Heavy set + back-off. Beat the logbook every session."},
      {id:"db_shoulder_press",sets:2,reps:"8-10",rpe:"9",rir:"1",rest:"2 min",notes:"Full ROM, control at bottom"},
      {id:"glute_ham_raise",sets:1,reps:"8-10",rpe:"10",rir:"0",rest:"90 sec",notes:"Slow negative. Weeks 9-12: dropset"},
      {id:"pendlay_row",sets:2,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"2 min",notes:"Explosive concentric"},
      {id:"db_curl",sets:1,reps:"10-12",rpe:"10",rir:"0",rest:"90 sec",notes:"Weeks 9-12: dropset (-50% weight)"},
      {id:"cable_lateral_raise",sets:1,reps:"10-12",rpe:"10",rir:"0",rest:"90 sec",notes:"Weeks 9-12: dropset"},
      {id:"cable_flye",sets:1,reps:"10-12",rpe:"10",rir:"0",rest:"90 sec",notes:"Weeks 9-12: dropset"},
    ]},
    "Upper":{focus:"Push + Pull, 45 min",exs:[
      {id:"dip_chest",sets:2,reps:"4-6",rpe:"8-9",rir:"2-1",rest:"3 min",notes:"Heavy set + back-off (8-10 reps)"},
      {id:"pullup",sets:2,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"2 min",notes:"Last set weeks 9-12: dropset"},
      {id:"db_shoulder_press",sets:2,reps:"12-15",rpe:"9-10",rir:"1-0",rest:"2 min",notes:"Seated. Last set dropset weeks 9-12"},
      {id:"cable_row",sets:2,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"2 min",notes:"Squeeze at top. Machine row."},
      {id:"skull_crusher",sets:2,reps:"12-15",rpe:"10",rir:"0",rest:"90 sec",notes:"Superset A1 (no rest to curls)"},
      {id:"db_curl",sets:2,reps:"12-15",rpe:"10",rir:"0",rest:"90 sec",notes:"Superset A2 — 0 rest between A1/A2"},
    ]},
    "Lower":{focus:"Posterior + Anterior Chain, 45 min",exs:[
      {id:"glute_ham_raise",sets:2,reps:"10-12",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"2-3 sec negative"},
      {id:"bulgarian_split",sets:3,reps:"8-10/leg",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Minimize rear leg contribution"},
      {id:"calf_raise",sets:2,reps:"15-20",rpe:"10",rir:"0",rest:"90 sec",notes:"Superset B1 (no rest to crunches)"},
      {id:"cable_crunch",sets:2,reps:"12-15",rpe:"10",rir:"0",rest:"90 sec",notes:"Superset B2 — 0 rest between B1/B2"},
      {id:"leg_press",sets:1,reps:"12-15",rpe:"10",rir:"0",rest:"90 sec",notes:"Weeks 9-12: dropset toe press variation"},
    ]},
  }
},
{
  id:"nippard_upper_lower_4x", name:"Nippard Upper/Lower", cat:"nippard", emoji:"💪",
  days:4, weeks:12, level:"Intermediate", source:"Jeff Nippard – The Muscle Ladder",
  tagline:"3-week intensity waves. Science-based hypertrophy.",
  desc:"Classic Upper/Lower with 3-week intensity waves (RPE 7→8→9) then reset. Double progression. 10-20 sets per muscle per week. Lengthened partials and dropsets.",
  goals:["Muscle hypertrophy","Strength progression","Balanced development"],
  sched:["Upper A","Lower A","Rest","Upper B","Lower B","Rest","Rest"],
  workouts:{
    "Upper A":{focus:"Strength Emphasis (Heavy)",exs:[
      {id:"lat_pulldown",sets:3,reps:"8-10",rpe:"8-9",rir:"2-1",rest:"2-3 min",notes:"Elbows down & in. Last set: lengthened partials"},
      {id:"db_bench",sets:3,reps:"8-10",rpe:"8-9",rir:"2-1",rest:"2-3 min",notes:"1 sec pause on chest. Last set: lengthened partials"},
      {id:"db_row",sets:3,reps:"10-12",rpe:"8-9",rir:"2-1",rest:"2-3 min",notes:"Deficit row for stretch"},
      {id:"db_shoulder_press",sets:3,reps:"10-12",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Keep tension at bottom"},
      {id:"cable_lateral_raise",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"60 sec",notes:"Squeeze delt. Failure + partials"},
      {id:"face_pull",sets:2,reps:"15-20",rpe:"8",rir:"2",rest:"60 sec",notes:"Shoulder health"},
    ]},
    "Lower A":{focus:"Quad Dominant",exs:[
      {id:"squat",sets:3,reps:"6-8",rpe:"7-8",rir:"3-2",rest:"3-5 min",notes:"Low RPE - high muscle damage"},
      {id:"rdl",sets:3,reps:"8-10",rpe:"8",rir:"2",rest:"2-3 min",notes:"Bottom 3/4 ROM only"},
      {id:"hack_squat",sets:2,reps:"10-12",rpe:"9",rir:"1",rest:"2 min",notes:"Knees forward, quad focus. Last set: partials"},
      {id:"leg_curl",sets:3,reps:"10-12",rpe:"9",rir:"1",rest:"90 sec",notes:"Lean forward for stretch"},
      {id:"calf_raise",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"60 sec",notes:"2 sec pause at bottom"},
    ]},
    "Upper B":{focus:"Volume/Hypertrophy",exs:[
      {id:"pullup",sets:3,reps:"6-10",rpe:"9",rir:"1",rest:"2-3 min",notes:"Full ROM. Last set: partials"},
      {id:"low_incline_press",sets:3,reps:"8-10",rpe:"9",rir:"1",rest:"2-3 min",notes:"Bottom half ROM only. 1 sec pause"},
      {id:"helms_row",sets:3,reps:"8-10",rpe:"9",rir:"1",rest:"2-3 min",notes:"Touch chest on each rep"},
      {id:"cable_reverse_flye",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"75 sec",notes:"Pre-stretch rear delt, 1 arm"},
      {id:"db_curl",sets:2,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"75 sec",notes:"Dropset last set"},
      {id:"overhead_tricep_ext",sets:2,reps:"10-12",rpe:"9-10",rir:"1-0",rest:"75 sec",notes:"Pause in stretch. Dropset last set"},
    ]},
    "Lower B":{focus:"Hip Dominant + Unilateral",exs:[
      {id:"deadlift",sets:3,reps:"5-6",rpe:"7",rir:"3",rest:"4-5 min",notes:"Low RPE - big muscle damage"},
      {id:"bulgarian_split",sets:3,reps:"8-10/leg",rpe:"9",rir:"1",rest:"2 min",notes:"Minimize rear leg. Quad stretch after"},
      {id:"leg_extension",sets:2,reps:"12-15",rpe:"9-10",rir:"1-0",rest:"90 sec",notes:"Lengthened partials last set"},
      {id:"nordic_curl",sets:2,reps:"6-8",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Max hamstring stretch"},
      {id:"calf_raise",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"60 sec",notes:""},
      {id:"cable_woodchop",sets:2,reps:"10/side",rpe:"8",rir:"2",rest:"60 sec",notes:"Rotational core"},
    ]},
  }
},
{
  id:"nippard_pbl_phase2", name:"Pure Bodybuilding Ph.2", cat:"nippard", emoji:"💪",
  days:5, weeks:10, level:"Advanced", source:"Jeff Nippard – Pure Bodybuilding Phase 2",
  tagline:"Two 5-week blocks. Climb phase then Grind phase.",
  desc:"5-day: 4 Full Body sessions + Arms & Weak Points. Two 5-week blocks (Climb: RPE builds 7→9-10; Grind: deload then 4 weeks high volume). Lengthened partials, dropsets, integrated partials.",
  goals:["Maximum hypertrophy","Advanced techniques","Weak point targeting"],
  sched:["Full Body #1","Full Body #2","Rest","Full Body #3","Full Body #4","Arms & Weak Points","Rest"],
  workouts:{
    "Full Body #1":{focus:"Back Width + Chest + Glutes + Quads + Delts + Calves",exs:[
      {id:"lat_pulldown",sets:"2-3",reps:"8-10",rpe:"7→9-10",rir:"3→1-0",rest:"2-3 min",notes:"Week 1: RPE7. Week 5: RPE9-10 + lengthened partials"},
      {id:"db_bench",sets:"2-3",reps:"8-10",rpe:"7→9-10",rir:"3→1-0",rest:"3-5 min",notes:"1 sec pause. Last set: lengthened partials"},
      {id:"glute_ham_raise",sets:"2-3",reps:"8-10",rpe:"7→8-9",rir:"3→2-1",rest:"2-3 min",notes:"Slow 2-3 sec negative"},
      {id:"hack_squat",sets:"2-3",reps:"8-10",rpe:"7-8→9-10",rir:"3-2→1-0",rest:"1-2 min",notes:"Knees forward, lengthened partials last set"},
      {id:"cable_lateral_raise",sets:3,reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Failure + lengthened partials"},
      {id:"calf_raise",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"1-2 min",notes:"2 sec pause bottom, roll ankle"},
    ]},
    "Full Body #2":{focus:"Hamstrings + Quads + Back Thickness + Pecs + Hip Abduction + Triceps",exs:[
      {id:"nordic_curl",sets:"2-3",reps:"8-10",rpe:"7→8-9",rir:"3→2-1",rest:"1-2 min",notes:"Lean forward for max stretch"},
      {id:"squat",sets:"2-3",reps:"6-8",rpe:"7→7-8",rir:"3→3-2",rest:"3-5 min",notes:"Bottom half ROM, feet forward"},
      {id:"db_row",sets:"2-3",reps:"8-10",rpe:"7→8-9",rir:"3→2-1",rest:"2-3 min",notes:"Arm-out, elbows flared 45°"},
      {id:"cable_flye",sets:2,reps:"8-10",rpe:"7-8→8-9",rir:"3-2→2-1",rest:"2-3 min",notes:"Bottom half ROM only"},
      {id:"cable_hip_abduction",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Failure - inner thigh"},
      {id:"overhead_tricep_ext",sets:2,reps:"10-12",rpe:"7-8→8-9",rir:"3-2→2-1",rest:"1-2 min",notes:"1 sec pause in stretch. Dropset last set"},
    ]},
    "Full Body #3":{focus:"Back Thickness + Incline Chest + Quads + Delts + Calves + Biceps",exs:[
      {id:"helms_row",sets:"2-3",reps:"8-10",rpe:"7→9-10",rir:"3→1-0",rest:"3-4 min",notes:"Touch chest each rep. Lengthened partials"},
      {id:"low_incline_press",sets:"2-3",reps:"8-10",rpe:"7→9-10",rir:"3→1-0",rest:"2-3 min",notes:"Bottom half ROM. 1 sec pause"},
      {id:"bulgarian_split",sets:"2-3",reps:"8-10/leg",rpe:"7→9-10",rir:"3→1-0",rest:"2-3 min",notes:"Minimize rear leg. Quad static stretch"},
      {id:"db_lateral_raise",sets:3,reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Lengthened partials last set"},
      {id:"calf_raise",sets:3,reps:"12-15",rpe:"9",rir:"1",rest:"1-2 min",notes:""},
      {id:"preacher_curl",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Bottom half ROM, constant tension"},
    ]},
    "Full Body #4":{focus:"Deadlift + Squat + Lats + Shoulders + Hip Adduction + Rear Delts",exs:[
      {id:"deadlift",sets:"2-3",reps:"8-10",rpe:"5-6→6-7",rir:"5-4→4-3",rest:"3-5 min",notes:"Low RPE - lots of muscle damage"},
      {id:"front_squat",sets:"2-3",reps:"6-8",rpe:"7→7-8",rir:"3→3-2",rest:"3-5 min",notes:"Pause at bottom, knees forward"},
      {id:"cross_body_lat",sets:"2-3",reps:"8-10",rpe:"8→9-10",rir:"2→1-0",rest:"2-3 min",notes:"Integrated partials all sets"},
      {id:"db_shoulder_press",sets:"2-3",reps:"8-10",rpe:"7→8-9",rir:"3→2-1",rest:"2-3 min",notes:"Slight elbow flare"},
      {id:"copenhagen_adduction",sets:"2-3",reps:"8-10/side",rpe:"9",rir:"1",rest:"1-2 min",notes:"Inner thigh - failure"},
      {id:"cable_reverse_flye",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Pre-stretch rear delt. 1 arm at time"},
    ]},
    "Arms & Weak Points":{focus:"Biceps + Triceps + Weak Point",exs:[
      {id:"db_curl",sets:"2-3",reps:"8-12",rpe:"7-8→9-10",rir:"3-2→1-0",rest:"1-3 min",notes:"Slow eccentric"},
      {id:"overhead_tricep_ext",sets:"2-3",reps:"8-12",rpe:"7-8→9-10",rir:"3-2→1-0",rest:"1-3 min",notes:"1 sec pause in stretch"},
      {id:"bayesian_curl",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Bottom half ROM, constant tension"},
      {id:"skull_crusher",sets:2,reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Feel nasty stretch, 1 sec pause"},
      {id:"cable_crunch",sets:"2-3",reps:"10-20",rpe:"9-10",rir:"1-0",rest:"1-2 min",notes:"Weak Point Option: Abs"},
      {id:"db_lateral_raise",sets:"2-3",reps:"10-12",rpe:"9",rir:"1",rest:"1-2 min",notes:"Weak Point Option: Delts"},
    ]},
  }
},
{
  id:"athlean_athletic_5x", name:"Athlean Athletic", cat:"athlean", emoji:"⚡",
  days:5, weeks:12, level:"Intermediate", source:"Athlean-X AX1 Methodology",
  tagline:"Train like an athlete. Every movement has carryover.",
  desc:"Push/Pull/Legs + Conditioning + Full Body Athletic. Signature YTW raises every upper session. Athlean Burst HIIT conditioning.",
  goals:["Athletic performance","Functional strength","Conditioning","Shoulder health"],
  sched:["Push","Pull","Legs","Conditioning","Full Body Athletic","Rest","Rest"],
  workouts:{
    "Push":{focus:"Chest + Shoulders + Triceps",exs:[
      {id:"db_bench",sets:3,reps:"8-10",rpe:"8-9",rir:"2-1",rest:"2 min",notes:""},
      {id:"db_shoulder_press",sets:3,reps:"8-10",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Slight forward lean"},
      {id:"low_incline_press",sets:3,reps:"10-12",rpe:"9",rir:"1",rest:"90 sec",notes:"Bottom half ROM"},
      {id:"cable_lateral_raise",sets:3,reps:"12-15",rpe:"9-10",rir:"1-0",rest:"60 sec",notes:""},
      {id:"overhead_tricep_ext",sets:2,reps:"12-15",rpe:"9",rir:"1",rest:"75 sec",notes:""},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"⚡ AX1 staple — never skip"},
      {id:"external_rotation",sets:2,reps:"15/arm",rpe:"7",rir:"3",rest:"45 sec",notes:""},
    ]},
    "Pull":{focus:"Back + Biceps + Rear Delts",exs:[
      {id:"pullup",sets:3,reps:"AMRAP",rpe:"9-10",rir:"1-0",rest:"2-3 min",notes:"Dead hang, full ROM"},
      {id:"pendlay_row",sets:3,reps:"6-8",rpe:"9",rir:"1",rest:"2-3 min",notes:"Explosive concentric"},
      {id:"lat_pulldown",sets:3,reps:"10-12",rpe:"9",rir:"1",rest:"90 sec",notes:"Vary grips each session"},
      {id:"face_pull",sets:3,reps:"15-20",rpe:"8",rir:"2",rest:"60 sec",notes:"Rear delt health essential"},
      {id:"db_curl",sets:2,reps:"10-12",rpe:"9",rir:"1",rest:"75 sec",notes:""},
      {id:"hammer_curl",sets:2,reps:"10-12",rpe:"9",rir:"1",rest:"75 sec",notes:""},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"⚡ YTW every upper session"},
    ]},
    "Legs":{focus:"Athletic Lower Body",exs:[
      {id:"squat",sets:3,reps:"6-8",rpe:"8",rir:"2",rest:"3 min",notes:""},
      {id:"rdl",sets:3,reps:"8-10",rpe:"8",rir:"2",rest:"2 min",notes:""},
      {id:"box_jump",sets:4,reps:"5",rpe:"9",rir:"1",rest:"2 min",notes:"Athletic power development"},
      {id:"bulgarian_split",sets:3,reps:"8-10/leg",rpe:"9",rir:"1",rest:"2 min",notes:""},
      {id:"nordic_curl",sets:2,reps:"5-8",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Hamstring injury prevention"},
      {id:"calf_raise",sets:3,reps:"15-20",rpe:"9",rir:"1",rest:"60 sec",notes:""},
      {id:"lateral_band_walk",sets:3,reps:"15/side",rpe:"8",rir:"2",rest:"60 sec",notes:""},
    ]},
    "Conditioning":{focus:"Athlean Burst HIIT",exs:[
      {id:"sprint_lateral",sets:8,reps:"30s ON/30s OFF",rpe:"9-10",rir:"1-0",rest:"30 sec",notes:"⚡ Athlean Burst protocol"},
      {id:"box_jump",sets:3,reps:"8",rpe:"9",rir:"1",rest:"90 sec",notes:""},
      {id:"lateral_bound",sets:4,reps:"5/side",rpe:"9",rir:"1",rest:"90 sec",notes:""},
      {id:"agility_ladder",sets:5,reps:"30 sec",rpe:"9",rir:"1",rest:"60 sec",notes:"Various footwork patterns"},
      {id:"plank",sets:3,reps:"45-60 sec",rpe:"8-9",rir:"2-1",rest:"60 sec",notes:""},
      {id:"pallof_press",sets:3,reps:"10/side",rpe:"8",rir:"2",rest:"60 sec",notes:""},
    ]},
    "Full Body Athletic":{focus:"Total Athletic Performance",exs:[
      {id:"deadlift",sets:3,reps:"3-5",rpe:"8",rir:"2",rest:"3 min",notes:"Power movement"},
      {id:"db_bench",sets:3,reps:"8-10",rpe:"8",rir:"2",rest:"2 min",notes:""},
      {id:"pullup",sets:3,reps:"6-10",rpe:"8-9",rir:"2-1",rest:"2 min",notes:""},
      {id:"depth_jump",sets:3,reps:"5",rpe:"9",rir:"1",rest:"2 min",notes:""},
      {id:"med_ball_rotational",sets:3,reps:"8/side",rpe:"9",rir:"1",rest:"90 sec",notes:""},
      {id:"ytw_raise",sets:3,reps:"12-15",rpe:"8",rir:"2",rest:"60 sec",notes:"⚡ Athletic shoulder armor"},
    ]},
  }
},
{
  id:"rp_hypertrophy_4x", name:"RP Hypertrophy", cat:"rp_strength", emoji:"📈",
  days:4, weeks:8, level:"Intermediate", source:"RP Strength Hypertrophy App Principles",
  tagline:"MEV→MRV progression. Start minimal, build volume systematically.",
  desc:"Start at MEV (2 sets), add 1 set/week until MRV (~4-5 sets), deload week 4. Rate workouts (-2 to +2) to autoregulate. W1=3RIR, W2=2RIR, W3=1RIR, W4=deload.",
  goals:["Hypertrophy via progressive volume","Autoregulation","Sustainable progression"],
  sched:["Upper A","Lower A","Rest","Upper B","Lower B","Rest","Rest"],
  workouts:{
    "Upper A":{focus:"Back + Chest — MEV→MRV",exs:[
      {id:"lat_pulldown",sets:"2→4",reps:"10-12",rpe:"7→9",rir:"3→1",rest:"2-3 min",notes:"Start 2 sets. Add 1/week."},
      {id:"db_bench",sets:"2→4",reps:"8-10",rpe:"7→9",rir:"3→1",rest:"2-3 min",notes:"MEV=2 sets. Week 4 deload: 1 set"},
      {id:"face_pull",sets:"2→3",reps:"15-20",rpe:"7→8",rir:"3→2",rest:"60 sec",notes:"Shoulder health"},
      {id:"db_shoulder_press",sets:"2→3",reps:"10-12",rpe:"7→9",rir:"3→1",rest:"90 sec",notes:""},
      {id:"cable_lateral_raise",sets:"2→4",reps:"12-15",rpe:"7→9",rir:"3→1",rest:"60 sec",notes:"Rate session to autoregulate"},
    ]},
    "Lower A":{focus:"Quad Dominant — MEV→MRV",exs:[
      {id:"squat",sets:"2→4",reps:"6-8",rpe:"7→9",rir:"3→1",rest:"3-5 min",notes:"W1=3RIR, W2=2RIR, W3=1RIR, W4=deload"},
      {id:"leg_extension",sets:"2→4",reps:"12-15",rpe:"7→9",rir:"3→1",rest:"90 sec",notes:"Quad isolation volume"},
      {id:"rdl",sets:"2→3",reps:"8-10",rpe:"7→8",rir:"3→2",rest:"2-3 min",notes:""},
      {id:"calf_raise",sets:"3→5",reps:"12-15",rpe:"7→9",rir:"3→1",rest:"60 sec",notes:"Calves tolerate high volume"},
      {id:"cable_hip_abduction",sets:"2→3",reps:"12-15/side",rpe:"8→9",rir:"2→1",rest:"60 sec",notes:""},
    ]},
    "Upper B":{focus:"Shoulders + Arms — MEV→MRV",exs:[
      {id:"pullup",sets:"2→4",reps:"6-10",rpe:"7→9",rir:"3→1",rest:"2-3 min",notes:"Add weight when 10 reps easy"},
      {id:"low_incline_press",sets:"2→4",reps:"8-10",rpe:"7→9",rir:"3→1",rest:"2-3 min",notes:"Bottom half ROM"},
      {id:"db_curl",sets:"2→4",reps:"10-12",rpe:"7→9",rir:"3→1",rest:"75 sec",notes:"RP: prioritize sets over weight first"},
      {id:"skull_crusher",sets:"2→4",reps:"10-12",rpe:"7→9",rir:"3→1",rest:"75 sec",notes:""},
      {id:"ytw_raise",sets:"2→3",reps:"12-15",rpe:"7→8",rir:"3→2",rest:"60 sec",notes:""},
    ]},
    "Lower B":{focus:"Hip Dominant — MEV→MRV",exs:[
      {id:"deadlift",sets:"2→3",reps:"4-6",rpe:"7→8",rir:"3→2",rest:"4-5 min",notes:"Low RPE - high muscle damage"},
      {id:"bulgarian_split",sets:"2→4",reps:"8-10/leg",rpe:"7→9",rir:"3→1",rest:"2 min",notes:"RP: sets before weight"},
      {id:"leg_curl",sets:"2→4",reps:"10-12",rpe:"7→9",rir:"3→1",rest:"90 sec",notes:"Lean forward for stretch"},
      {id:"db_hip_thrust",sets:"2→3",reps:"12-15",rpe:"8→9",rir:"2→1",rest:"90 sec",notes:""},
      {id:"calf_raise",sets:"3→5",reps:"12-15",rpe:"7→9",rir:"3→1",rest:"60 sec",notes:""},
    ]},
  }
},
{
  id:"cali_foundation_3x", name:"Calisthenics Foundation", cat:"calisthenics", emoji:"🤸",
  days:3, weeks:8, level:"Beginner", source:"Cali Move – Complete Calisthenics",
  tagline:"Master your bodyweight. Skills, strength, no equipment needed.",
  desc:"Bodyweight-only skill progressions: rows → pull-ups → front lever; incline push-ups → dips → planche. Full body 3x/week. Only need a pull-up bar.",
  goals:["Bodyweight mastery","Skill development","Relative strength"],
  sched:["Full Body A","Rest","Full Body B","Rest","Full Body C","Rest","Rest"],
  workouts:{
    "Full Body A":{focus:"Push + Core",exs:[
      {id:"pushup_bw",sets:4,reps:"8-15",rpe:"8",rir:"2",rest:"2 min",notes:"Progress: incline → standard → archer → diamond"},
      {id:"pike_pushup",sets:3,reps:"8-12",rpe:"8",rir:"2",rest:"90 sec",notes:"Shoulder strength for handstand"},
      {id:"dip_bw",sets:3,reps:"8-12",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Full ROM, lean forward for pecs"},
      {id:"plank",sets:3,reps:"30-60 sec",rpe:"8",rir:"2",rest:"60 sec",notes:"Long lever, squeeze glutes"},
      {id:"l_sit",sets:3,reps:"10-20 sec",rpe:"8-9",rir:"2-1",rest:"60 sec",notes:"Tuck → one-leg → full"},
      {id:"ab_wheel",sets:3,reps:"8-12",rpe:"9",rir:"1",rest:"90 sec",notes:"Kneel first, then standing"},
    ]},
    "Full Body B":{focus:"Pull + Legs",exs:[
      {id:"inverted_row",sets:4,reps:"8-15",rpe:"8",rir:"2",rest:"2 min",notes:"Progress: incline → horizontal → feet elevated"},
      {id:"pullup_bw",sets:3,reps:"3-8",rpe:"8-9",rir:"2-1",rest:"2-3 min",notes:"Negatives only if can't do full"},
      {id:"goblet_squat",sets:3,reps:"10-15",rpe:"7-8",rir:"3-2",rest:"90 sec",notes:"Work toward pistol squat"},
      {id:"pistol_squat",sets:3,reps:"3-8/leg",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Assisted → free. Ultimate leg test"},
      {id:"calf_raise",sets:4,reps:"15-25",rpe:"9",rir:"1",rest:"60 sec",notes:"Single-leg progression"},
      {id:"hanging_leg_raise",sets:3,reps:"8-15",rpe:"8-9",rir:"2-1",rest:"90 sec",notes:"Tucked → straight → toes to bar"},
    ]},
    "Full Body C":{focus:"Skill Work + Full Body",exs:[
      {id:"handstand",sets:5,reps:"10-30 sec",rpe:"8-9",rir:"2-1",rest:"2 min",notes:"Wall → freestanding, 10 min total"},
      {id:"muscle_up",sets:4,reps:"3-6",rpe:"9",rir:"1",rest:"3 min",notes:"Kipping → strict. Master pull-up first"},
      {id:"dip_bw",sets:3,reps:"10-15",rpe:"8",rir:"2",rest:"90 sec",notes:""},
      {id:"pullup_bw",sets:3,reps:"5-10",rpe:"8-9",rir:"2-1",rest:"2 min",notes:""},
      {id:"pushup_bw",sets:3,reps:"15-20",rpe:"8",rir:"2",rest:"90 sec",notes:"Higher reps for endurance"},
      {id:"pallof_press",sets:3,reps:"10/side",rpe:"8",rir:"2",rest:"60 sec",notes:"Anti-rotation stability"},
    ]},
  }
},
];

const CAT_META = {
  tennis:       { label:"Tennis",        color:"#4ade80", bg:"rgba(74,222,128,0.12)" },
  nippard:      { label:"Jeff Nippard",  color:"#f59e0b", bg:"rgba(245,158,11,0.12)" },
  athlean:      { label:"Athlean-X",     color:"#ef4444", bg:"rgba(239,68,68,0.12)" },
  rp_strength:  { label:"RP Strength",   color:"#8b5cf6", bg:"rgba(139,92,246,0.12)" },
  calisthenics: { label:"Calisthenics",  color:"#06b6d4", bg:"rgba(6,182,212,0.12)" },
};

// localStorage store for deployed PWA
const store = {
  async get(k){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):null; }catch{ return null; } },
  async set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};

// ── Epley estimated 1RM ──────────────────────────────────
function epley1RM(w,r){ const wn=parseFloat(w),rn=parseInt(r); if(!wn||!rn) return 0; return rn===1?wn:wn*(1+rn/30); }

// ── PR detection ─────────────────────────────────────────
function detectNewPRs(session, existingPRs){
  const updated={...existingPRs}; const newPRs=[];
  session.exercises?.forEach(ex=>{
    ex.sets?.filter(s=>s.w&&s.r).forEach(s=>{
      const e1=epley1RM(s.w,s.r);
      const key=ex.name;
      if(!updated[key]||e1>updated[key].e1rm){
        newPRs.push({name:ex.name,w:s.w,r:s.r,e1rm:Math.round(e1*10)/10,date:session.date});
        updated[key]={name:ex.name,w:s.w,r:s.r,e1rm:Math.round(e1*10)/10,date:session.date};
      }
    });
  });
  const seen=new Set(); const deduped=newPRs.filter(p=>{ if(seen.has(p.name))return false; seen.add(p.name); return true; });
  return{updated,newPRs:deduped};
}

// ── Streak computation ───────────────────────────────────
function computeStreaks(sessions){
  if(!sessions.length) return{current:0,longest:0,lastDate:null};
  const sortedAsc=[...new Set(sessions.map(s=>s.date.slice(0,10)))].sort();
  // longest streak
  let run=1,longest=1;
  for(let i=1;i<sortedAsc.length;i++){
    const diff=Math.round((new Date(sortedAsc[i])-new Date(sortedAsc[i-1]))/86400000);
    if(diff===1){run++;longest=Math.max(longest,run);}else run=1;
  }
  // current streak (walk back from today)
  const today=new Date(); today.setHours(12,0,0,0);
  let cur=0; let check=new Date(today);
  for(let i=0;i<400;i++){
    const ds=check.toISOString().slice(0,10);
    if(sortedAsc.includes(ds)) cur++;
    else if(i===0) { check=new Date(check-86400000); continue; } // allow today to be rest
    else break;
    check=new Date(check-86400000);
  }
  return{current:cur,longest:Math.max(longest,cur),lastDate:sortedAsc[sortedAsc.length-1]};
}

// ── Progressive overload ─────────────────────────────────
function getLastExData(exName, allSessions){
  for(const s of [...allSessions].sort((a,b)=>new Date(b.date)-new Date(a.date))){
    const ex=s.exercises?.find(e=>e.name.toLowerCase().trim()===exName.toLowerCase().trim());
    if(ex){
      const valid=ex.sets?.filter(st=>st.w&&st.r);
      if(valid?.length){
        const best=valid.reduce((a,b)=>parseFloat(b.w)>parseFloat(a.w)?b:a);
        return{w:parseFloat(best.w),r:best.r};
      }
    }
  }
  return null;
}
function nextWeight(w,exName){
  const big=["squat","deadlift","press","row","pull","bench","thrust","rdl"];
  return big.some(c=>exName.toLowerCase().includes(c))?Math.round((w+2.5)*4)/4:Math.round((w+1)*4)/4;
}

// ── QR helpers ───────────────────────────────────────────
function makeQRUrl(text){ return`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(text)}`; }

const S = {
  app:{ minHeight:"100vh", background:"#060c18", color:"#f1f5f9", fontFamily:"'Segoe UI',system-ui,sans-serif", WebkitTapHighlightColor:"transparent", WebkitUserSelect:"none", userSelect:"none" },
  hdr:{ background:"rgba(6,12,24,0.96)", borderBottom:"1px solid rgba(245,158,11,0.2)", position:"sticky", top:0, zIndex:50 },
  hdrIn:{ maxWidth:820, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", height:58 },
  logo:{ display:"flex", alignItems:"center", gap:8 },
  logoT:{ fontWeight:900, fontSize:19, letterSpacing:2, color:"#f1f5f9" },
  logoA:{ color:"#f59e0b" },
  nav:{ display:"flex", gap:2 },
  navB:{ display:"flex", flexDirection:"column", alignItems:"center", padding:"6px 9px", background:"transparent", border:"none", cursor:"pointer", borderRadius:8, gap:2, outline:"none", WebkitTapHighlightColor:"transparent" },
  navBA:{ background:"rgba(245,158,11,0.12)" },
  navI:{ fontSize:16 },
  navL:{ color:"#64748b", fontSize:10 },
  main:{ maxWidth:820, margin:"0 auto", padding:"0 16px 80px" },
  pg:{ paddingTop:24 },
  pgH:{ marginBottom:20 },
  pgT:{ fontSize:26, fontWeight:900, color:"#f1f5f9", margin:0, letterSpacing:-0.5 },
  pgS:{ color:"#64748b", fontSize:14, margin:"4px 0 0" },
  card:{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"18px 16px", marginBottom:12 },
  cHdr:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 },
  cT:{ color:"#f1f5f9", fontWeight:700, fontSize:16, margin:0 },
  sg:{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:12 },
  sc:{ background:"rgba(255,255,255,0.03)", border:"1px solid", borderRadius:12, padding:"16px 12px", textAlign:"center" },
  sv:{ fontSize:28, fontWeight:900, margin:"4px 0" },
  sl:{ color:"#64748b", fontSize:11 },
  bp:{ background:"#f59e0b", color:"#000", fontWeight:700, fontSize:13, padding:"10px 18px", borderRadius:8, border:"none", cursor:"pointer", outline:"none", WebkitTapHighlightColor:"transparent" },
  bs:{ background:"transparent", color:"#94a3b8", fontWeight:600, fontSize:13, padding:"10px 18px", borderRadius:8, border:"1px solid rgba(255,255,255,0.12)", cursor:"pointer", outline:"none", WebkitTapHighlightColor:"transparent" },
  bd:{ background:"transparent", color:"#ef4444", fontWeight:600, fontSize:13, padding:"10px 18px", borderRadius:8, border:"1px solid rgba(239,68,68,0.3)", cursor:"pointer", outline:"none", WebkitTapHighlightColor:"transparent" },
  lnk:{ background:"transparent", border:"none", color:"#f59e0b", cursor:"pointer", fontSize:13, fontWeight:600, outline:"none", WebkitTapHighlightColor:"transparent" },
  chip:{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"#94a3b8", padding:"6px 12px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:500, outline:"none", WebkitTapHighlightColor:"transparent" },
  chipA:{ background:"rgba(245,158,11,0.15)", border:"1px solid #f59e0b", color:"#f59e0b", fontWeight:700 },
  bdg:{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", color:"#94a3b8", padding:"3px 8px", borderRadius:10, fontSize:11 },
  gc:{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", color:"#f59e0b", padding:"4px 10px", borderRadius:10, fontSize:12 },
  exB:{ background:"transparent", border:"1px solid rgba(255,255,255,0.08)", color:"#64748b", padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:12, width:"100%" },
  lbl:{ color:"#94a3b8", fontSize:12, fontWeight:600, letterSpacing:0.5 },
  inp:{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#f1f5f9", padding:"10px 12px", fontSize:14, boxSizing:"border-box", outline:"none" },
  sinp:{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:6, color:"#e2e8f0", padding:"7px 4px", fontSize:12, textAlign:"center", width:"100%", outline:"none", boxSizing:"border-box" },
  sinpD:{ background:"rgba(74,222,128,0.08)", borderColor:"rgba(74,222,128,0.3)", color:"#4ade80" },
  doneB:{ background:"transparent", border:"1px solid rgba(255,255,255,0.15)", borderRadius:6, color:"#475569", cursor:"pointer", fontSize:14, padding:0, height:34, width:"100%" },
  doneBA:{ background:"rgba(74,222,128,0.15)", border:"1px solid #4ade80", color:"#4ade80" },
  addS:{ background:"transparent", border:"1px dashed rgba(255,255,255,0.15)", color:"#64748b", padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12 },
  tmrB:{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", color:"rgba(245,158,11,0.7)", padding:"5px 8px", borderRadius:6, cursor:"pointer", fontSize:11 },
  modeC:{ flex:1, minWidth:140, padding:"20px 16px", background:"rgba(255,255,255,0.03)", border:"1px solid", borderRadius:12, cursor:"pointer", textAlign:"center" },
};

// ── TOAST SYSTEM ─────────────────────────────────────────
function Toast({toasts}){
  return(
    <div style={{position:"fixed",bottom:84,left:"50%",transform:"translateX(-50%)",zIndex:200,display:"flex",flexDirection:"column",gap:8,alignItems:"center",pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} style={{background:t.bg||"rgba(15,23,42,0.97)",border:`1px solid ${t.bc||"rgba(245,158,11,0.4)"}`,borderRadius:12,padding:"10px 18px",color:"#f1f5f9",fontSize:13,fontWeight:600,boxShadow:"0 4px 24px rgba(0,0,0,0.6)",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:10,pointerEvents:"auto",maxWidth:"90vw"}}>
          <span style={{overflow:"hidden",textOverflow:"ellipsis"}}>{t.msg}</span>
          {t.onUndo&&<button onClick={t.onUndo} style={{background:"rgba(245,158,11,0.2)",border:"1px solid rgba(245,158,11,0.5)",color:"#f59e0b",borderRadius:6,padding:"3px 10px",cursor:"pointer",fontSize:12,fontWeight:700,outline:"none",flexShrink:0}}>Undo</button>}
        </div>
      ))}
    </div>
  );
}

export default function IronLog(){
  const [view,setView]=useState("dashboard");
  const [sessions,setSessions]=useState([]);
  const [deletedSessions,setDeletedSessions]=useState([]);
  const [activeProg,setActiveProg]=useState(null);
  const [customExercises,setCustomExercises]=useState([]);
  const [prs,setPrs]=useState({});
  const [loaded,setLoaded]=useState(false);
  const [toasts,setToasts]=useState([]);
  const [editingSession,setEditingSession]=useState(null);
  const toastRefs=useRef({});

  useEffect(()=>{
    (async()=>{
      const s=await store.get("il_sessions");
      const p=await store.get("il_prog");
      const d=await store.get("il_deleted");
      const cx=await store.get("il_custom_ex");
      const pr=await store.get("il_prs");
      if(s) setSessions(s);
      if(p) setActiveProg(p);
      if(cx) setCustomExercises(cx);
      if(pr) setPrs(pr);
      if(d){
        const cutoff=Date.now()-30*24*60*60*1000;
        const live=d.filter(x=>new Date(x.deletedAt).getTime()>cutoff);
        setDeletedSessions(live);
        await store.set("il_deleted",live);
      }
      setLoaded(true);
    })();
  },[]);

  const addToast=useCallback((msg,opts={})=>{
    const id=Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg,...opts}]);
    const timer=setTimeout(()=>{
      setToasts(t=>t.filter(x=>x.id!==id));
      opts.onExpire?.();
    },opts.ms||3500);
    toastRefs.current[id]=timer;
    return id;
  },[]);

  const killToast=useCallback((id)=>{
    clearTimeout(toastRefs.current[id]);
    setToasts(t=>t.filter(x=>x.id!==id));
  },[]);

  const saveSession=useCallback(async(s)=>{
    const u=[s,...sessions];
    setSessions(u);
    await store.set("il_sessions",u);
    const{updated,newPRs}=detectNewPRs(s,prs);
    if(newPRs.length){
      setPrs(updated);
      await store.set("il_prs",updated);
      newPRs.slice(0,2).forEach((pr,i)=>{
        setTimeout(()=>addToast(`🏆 New PR: ${pr.name} — ${pr.w}kg × ${pr.r}`,{ms:5000,bc:"rgba(250,204,21,0.5)"}),i*600+400);
      });
    }
  },[sessions,prs,addToast]);

  const updateSession=useCallback(async(updated)=>{
    const u=sessions.map(s=>s.id===updated.id?updated:s);
    setSessions(u);
    await store.set("il_sessions",u);
    addToast("✅ Session updated");
  },[sessions,addToast]);

  const saveProg=useCallback(async(p)=>{
    setActiveProg(p); await store.set("il_prog",p);
  },[]);

  const softDelete=useCallback(async(id)=>{
    const target=sessions.find(s=>s.id===id);
    if(!target) return;
    const newSess=sessions.filter(s=>s.id!==id);
    setSessions(newSess);
    await store.set("il_sessions",newSess);
    let undone=false;
    const tid=addToast(`Deleted: ${target.name}`,{
      ms:5000,
      onUndo:async()=>{
        undone=true; killToast(tid);
        const restored=[target,...newSess].sort((a,b)=>new Date(b.date)-new Date(a.date));
        setSessions(restored);
        await store.set("il_sessions",restored);
        addToast("↩ Restored",{ms:2500});
      },
      onExpire:async()=>{
        if(!undone){
          const nd=[...deletedSessions,{...target,deletedAt:new Date().toISOString()}];
          setDeletedSessions(nd);
          await store.set("il_deleted",nd);
        }
      }
    });
  },[sessions,deletedSessions,addToast,killToast]);

  const restoreSession=useCallback(async(id)=>{
    const target=deletedSessions.find(s=>s.id===id);
    if(!target) return;
    const{deletedAt,...clean}=target;
    const nd=deletedSessions.filter(s=>s.id!==id);
    const ns=[clean,...sessions].sort((a,b)=>new Date(b.date)-new Date(a.date));
    setDeletedSessions(nd); setSessions(ns);
    await store.set("il_deleted",nd);
    await store.set("il_sessions",ns);
    addToast("↩ Restored to History",{ms:2500});
  },[deletedSessions,sessions,addToast]);

  const permanentDelete=useCallback(async(id)=>{
    const nd=deletedSessions.filter(s=>s.id!==id);
    setDeletedSessions(nd);
    await store.set("il_deleted",nd);
  },[deletedSessions]);

  const saveCustomExercise=useCallback(async(ex)=>{
    if(customExercises.find(e=>e.name.toLowerCase().trim()===ex.name.toLowerCase().trim())) return;
    const upd=[...customExercises,ex];
    setCustomExercises(upd);
    await store.set("il_custom_ex",upd);
  },[customExercises]);

  const importSessions=useCallback(async(incoming)=>{
    const ids=new Set(sessions.map(s=>s.id));
    const fresh=incoming.filter(s=>!ids.has(s.id));
    if(!fresh.length){addToast("No new sessions to import",{ms:3000});return;}
    const merged=[...sessions,...fresh].sort((a,b)=>new Date(b.date)-new Date(a.date));
    setSessions(merged);
    await store.set("il_sessions",merged);
    addToast(`✅ Imported ${fresh.length} session${fresh.length>1?"s":""}`,{ms:3500});
  },[sessions,addToast]);

  if(!loaded) return <div style={{...S.app,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#f59e0b",fontSize:18,letterSpacing:2}}>LOADING...</span></div>;

  const allExercises=[...ALL_EX,...customExercises.map(e=>({...e,isCustom:true}))];
  const tabs=[{id:"dashboard",icon:"⚡",label:"Home"},{id:"programs",icon:"📋",label:"Programs"},{id:"log",icon:"✏️",label:"Log"},{id:"history",icon:"📊",label:"History"},{id:"nutrition",icon:"🥗",label:"Nutrition"}];

  return(
    <div style={S.app}>
      <header style={S.hdr}>
        <div style={S.hdrIn}>
          <div style={S.logo}><span>🔩</span><span style={S.logoT}>IRON<span style={S.logoA}>LOG</span></span></div>
          <nav style={S.nav}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setView(t.id)} style={{...S.navB,...(view===t.id?S.navBA:{})}}>
                <span style={S.navI}>{t.icon}</span><span style={S.navL}>{t.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main style={S.main}>
        {view==="dashboard"&&<Dashboard sessions={sessions} activeProg={activeProg} setView={setView} prs={prs}/>}
        {view==="programs"&&<ProgramBrowser activeProg={activeProg} saveProg={saveProg} setView={setView}/>}
        {view==="log"&&(editingSession
          ?<WorkoutLogger activeProg={activeProg} saveSession={updateSession} setView={setView} allExercises={allExercises} saveCustomExercise={saveCustomExercise} sessions={sessions} editingSession={editingSession} onCancelEdit={()=>{setEditingSession(null);setView("history");}}/>
          :<WorkoutLogger activeProg={activeProg} saveSession={saveSession} setView={setView} allExercises={allExercises} saveCustomExercise={saveCustomExercise} sessions={sessions}/>
        )}
        {view==="history"&&<History sessions={sessions} softDelete={softDelete} deletedSessions={deletedSessions} restoreSession={restoreSession} permanentDelete={permanentDelete} importSessions={importSessions} onEdit={s=>{setEditingSession(s);setView("log");}}/>}
        {view==="nutrition"&&<Nutrition/>}
      </main>
      <Toast toasts={toasts}/>
    </div>
  );
}

function Dashboard({sessions,activeProg,setView,prs}){
  const prog=activeProg?PROGRAMS.find(p=>p.id===activeProg.id):null;
  const{current:curStreak,longest:bestStreak,lastDate}=computeStreaks(sessions);
  const now=new Date(); now.setHours(0,0,0,0);
  const daysSince=lastDate?Math.round((now-new Date(lastDate+"T12:00:00"))/86400000):null;

  const weekStart=new Date(now); weekStart.setDate(now.getDate()-now.getDay());
  const lastWkStart=new Date(weekStart); lastWkStart.setDate(weekStart.getDate()-7);
  const thisWk=sessions.filter(s=>new Date(s.date)>=weekStart).length;
  const lastWk=sessions.filter(s=>new Date(s.date)>=lastWkStart&&new Date(s.date)<weekStart).length;

  const totalVol=sessions.reduce((a,s)=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(st=>{v+=(parseFloat(st.w)||0)*(parseFloat(st.r)||0);}));return a+v;},0);

  const catCount={};
  sessions.forEach(s=>s.exercises?.forEach(ex=>{
    const found=ALL_EX.find(e=>e.name===ex.name);
    if(found) catCount[found.cat]=(catCount[found.cat]||0)+1;
  }));
  const topCat=Object.entries(catCount).sort((a,b)=>b[1]-a[1])[0];

  const topPRs=Object.values(prs).sort((a,b)=>b.e1rm-a.e1rm).slice(0,5);

  const nudge=daysSince===null?null
    :daysSince===0?"Trained today 💪"
    :daysSince===1?"Last trained yesterday"
    :daysSince>=3?`${daysSince} days since last workout — time to train?`
    :null;

  return(
    <div style={S.pg}>
      <div style={S.pgH}><h1 style={S.pgT}>Dashboard</h1><p style={S.pgS}>Your training at a glance</p></div>

      {nudge&&<div style={{background:daysSince>=3?"rgba(239,68,68,0.08)":"rgba(74,222,128,0.08)",border:`1px solid ${daysSince>=3?"rgba(239,68,68,0.25)":"rgba(74,222,128,0.25)"}`,borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13,color:daysSince>=3?"#ef4444":"#4ade80",fontWeight:600}}>{nudge}</div>}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <div style={{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:12,padding:"14px"}}>
          <div style={{color:"#f59e0b",fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:6}}>TRAINING STREAK</div>
          <div style={{color:"#f59e0b",fontWeight:900,fontSize:30,lineHeight:1}}>{curStreak}<span style={{fontSize:14,fontWeight:600}}> days</span></div>
          <div style={{color:"#64748b",fontSize:11,marginTop:4}}>Best: {bestStreak} days</div>
        </div>
        <div style={{background:"rgba(74,222,128,0.06)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:12,padding:"14px"}}>
          <div style={{color:"#4ade80",fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:6}}>TOTAL VOLUME</div>
          <div style={{color:"#4ade80",fontWeight:900,fontSize:30,lineHeight:1}}>{totalVol>=1000?(totalVol/1000).toFixed(1)+"k":(totalVol||"—")}<span style={{fontSize:14,fontWeight:600}}>{totalVol>0?" kg":""}</span></div>
          <div style={{color:"#64748b",fontSize:11,marginTop:4}}>{sessions.length} sessions total</div>
        </div>
      </div>

      <div style={{...S.card,marginBottom:12}}>
        <div style={S.cHdr}><h2 style={S.cT}>This Week</h2></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[
            {l:"This week",v:thisWk,c:"#f59e0b"},
            {l:"Last week",v:lastWk,c:"#94a3b8"},
            {l:"Top muscle",v:topCat?topCat[0]:"—",c:"#a78bfa"},
          ].map((st,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"10px",textAlign:"center"}}>
              <div style={{color:st.c,fontWeight:800,fontSize:i===2?12:22,marginBottom:3}}>{st.v}</div>
              <div style={{color:"#64748b",fontSize:10}}>{st.l}</div>
            </div>
          ))}
        </div>
      </div>

      {topPRs.length>0&&(
        <div style={S.card}>
          <div style={S.cHdr}><h2 style={S.cT}>🏆 Personal Records</h2><span style={{color:"#64748b",fontSize:11}}>Est. 1RM (Epley)</span></div>
          {topPRs.map((pr,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
              <div>
                <div style={{color:"#e2e8f0",fontWeight:600,fontSize:13}}>{pr.name}</div>
                <div style={{color:"#64748b",fontSize:11,marginTop:2}}>{pr.w}kg × {pr.r} · {new Date(pr.date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:"#f59e0b",fontWeight:800,fontSize:16}}>{pr.e1rm}<span style={{fontSize:11}}> kg</span></div>
                <div style={{color:"#475569",fontSize:10}}>e1RM</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {prog?(
        <div style={S.card}>
          <div style={S.cHdr}><h2 style={S.cT}>Active Program</h2><button onClick={()=>setView("programs")} style={S.lnk}>Change</button></div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <span style={{fontSize:32}}>{prog.emoji}</span>
            <div>
              <div style={{color:"#f1f5f9",fontWeight:700,fontSize:17}}>{prog.name}</div>
              <div style={{color:"#94a3b8",fontSize:13}}>{prog.days}x/week · {prog.weeks} weeks · {prog.level}</div>
            </div>
          </div>
          <button onClick={()=>setView("log")} style={S.bp}>✏️ Log Next Workout</button>
        </div>
      ):(
        <div style={{...S.card,textAlign:"center",padding:"28px 24px"}}>
          <div style={{fontSize:40,marginBottom:12}}>📋</div>
          <div style={{color:"#f1f5f9",fontWeight:600,marginBottom:8}}>No Active Program</div>
          <div style={{color:"#64748b",fontSize:14,marginBottom:16}}>Browse programs to find one that fits your goals</div>
          <button onClick={()=>setView("programs")} style={S.bp}>Browse Programs</button>
        </div>
      )}
      <div style={S.card}>
        <div style={S.cHdr}><h2 style={S.cT}>Quick Actions</h2></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={()=>setView("log")} style={S.bp}>✏️ Log Workout</button>
          <button onClick={()=>setView("history")} style={S.bs}>📊 History</button>
          <button onClick={()=>setView("programs")} style={S.bs}>📋 Programs</button>
        </div>
      </div>
      {sessions.length>0&&(
        <div style={S.card}>
          <div style={S.cHdr}><h2 style={S.cT}>Recent Sessions</h2><button onClick={()=>setView("history")} style={S.lnk}>See All</button></div>
          {sessions.slice(0,3).map(s=>(
            <div key={s.id} style={{padding:"10px 0",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
              <div style={{color:"#e2e8f0",fontWeight:600,fontSize:14}}>{s.name}</div>
              <div style={{color:"#64748b",fontSize:12,marginTop:3}}>{new Date(s.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})} · {s.exercises?.length||0} exercises</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgramBrowser({activeProg,saveProg,setView}){
  const [catF,setCatF]=useState("all");
  const [daysF,setDaysF]=useState(0);
  const [exp,setExp]=useState(null);
  const [rec,setRec]=useState(null);
  const [showRec,setShowRec]=useState(false);
  const [recDays,setRecDays]=useState(3);
  const [recGoal,setRecGoal]=useState("tennis");

  const getRecommendation=()=>{
    let c=PROGRAMS;
    c=c.filter(p=>Math.abs(p.days-recDays)<=1);
    const goalMap={tennis:"tennis",muscle:["nippard","rp_strength"],athletic:["athlean","tennis"],bodyweight:"calisthenics"};
    const gCats=goalMap[recGoal];
    const filtered=c.filter(p=>Array.isArray(gCats)?gCats.includes(p.cat):p.cat===gCats);
    setRec(filtered[0]||c[0]||PROGRAMS[0]);
    setShowRec(false);
  };

  const filtered=PROGRAMS.filter(p=>(catF==="all"||p.cat===catF)&&(daysF===0||p.days===daysF));

  return (
    <div style={S.pg}>
      <div style={S.pgH}><h1 style={S.pgT}>Programs</h1><p style={S.pgS}>{PROGRAMS.length} science-based programs</p></div>
      <div style={S.card}>
        <div style={S.cHdr}>
          <h2 style={S.cT}>🎯 Get a Recommendation</h2>
          <button onClick={()=>setShowRec(!showRec)} style={S.lnk}>{showRec?"Hide":"Expand"}</button>
        </div>
        {showRec&&(
          <div>
            <div style={{marginBottom:12}}>
              <div style={S.lbl}>Days/week available?</div>
              <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
                {[2,3,4,5,6].map(d=><button key={d} onClick={()=>setRecDays(d)} style={{...S.chip,...(recDays===d?S.chipA:{})}}>{d}x</button>)}
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <div style={S.lbl}>Primary goal?</div>
              <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
                {[{id:"tennis",label:"🎾 Tennis"},{id:"muscle",label:"💪 Muscle"},{id:"athletic",label:"⚡ Athletic"},{id:"bodyweight",label:"🤸 Bodyweight"}].map(g=>(
                  <button key={g.id} onClick={()=>setRecGoal(g.id)} style={{...S.chip,...(recGoal===g.id?S.chipA:{})}}>{g.label}</button>
                ))}
              </div>
            </div>
            <button onClick={getRecommendation} style={S.bp}>Get Recommendation ✨</button>
          </div>
        )}
        {rec&&(
          <div style={{marginTop:16,padding:16,background:"rgba(245,158,11,0.08)",borderRadius:10,border:"1px solid rgba(245,158,11,0.25)"}}>
            <div style={{color:"#f59e0b",fontWeight:700,marginBottom:4}}>✨ Recommended:</div>
            <div style={{color:"#f1f5f9",fontWeight:600}}>{rec.emoji} {rec.name}</div>
            <div style={{color:"#94a3b8",fontSize:13}}>{rec.tagline}</div>
            <button onClick={()=>setExp(rec.id)} style={{...S.lnk,marginTop:8,display:"block"}}>View Details →</button>
          </div>
        )}
      </div>

      <div style={S.card}>
        <div style={{marginBottom:12}}>
          <div style={S.lbl}>Category</div>
          <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
            <button onClick={()=>setCatF("all")} style={{...S.chip,...(catF==="all"?S.chipA:{})}}>All</button>
            {Object.entries(CAT_META).map(([k,m])=>(
              <button key={k} onClick={()=>setCatF(k)} style={{...S.chip,...(catF===k?{...S.chipA,background:m.bg,borderColor:m.color,color:m.color}:{})}}>{m.label}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={S.lbl}>Days/Week</div>
          <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
            <button onClick={()=>setDaysF(0)} style={{...S.chip,...(daysF===0?S.chipA:{})}}>Any</button>
            {[2,3,4,5,6].map(d=><button key={d} onClick={()=>setDaysF(d)} style={{...S.chip,...(daysF===d?S.chipA:{})}}>{d}x</button>)}
          </div>
        </div>
      </div>

      {filtered.map(prog=>{
        const isActive=activeProg?.id===prog.id;
        const isExp=exp===prog.id;
        const m=CAT_META[prog.cat];
        return (
          <div key={prog.id} style={{...S.card,borderColor:isActive?"#f59e0b":(isExp?m.color+"50":"rgba(255,255,255,0.06)")}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
              <span style={{fontSize:34,lineHeight:1}}>{prog.emoji}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <h3 style={{color:"#f1f5f9",fontWeight:700,fontSize:16,margin:0}}>{prog.name}</h3>
                  {isActive&&<span style={{background:"#f59e0b",color:"#000",padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:700}}>ACTIVE</span>}
                  <span style={{background:m.bg,color:m.color,padding:"2px 8px",borderRadius:10,fontSize:11,border:`1px solid ${m.color}40`}}>{m.label}</span>
                </div>
                <div style={{color:"#94a3b8",fontSize:13,marginTop:4}}>{prog.tagline}</div>
                <div style={{display:"flex",gap:10,marginTop:6,flexWrap:"wrap"}}>
                  <span style={S.bdg}>📅 {prog.days}x/week</span>
                  <span style={S.bdg}>⏱ {prog.weeks} weeks</span>
                  <span style={S.bdg}>🎯 {prog.level}</span>
                </div>
              </div>
            </div>
            <button onClick={()=>setExp(isExp?null:prog.id)} style={{...S.exB,marginTop:12}}>
              {isExp?"▲ Hide Details":"▼ View Program Details"}
            </button>
            {isExp&&<ProgDetail prog={prog} isActive={isActive} saveProg={saveProg} setView={setView} m={m}/>}
          </div>
        );
      })}
    </div>
  );
}

function ProgDetail({prog,isActive,saveProg,setView,m}){
  const [wOpen,setWOpen]=useState(null);
  return (
    <div style={{marginTop:16}}>
      <p style={{color:"#94a3b8",fontSize:14,lineHeight:1.6,marginBottom:12}}>{prog.desc}</p>
      <div style={{marginBottom:14}}>
        <div style={S.lbl}>Goals</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>{prog.goals.map((g,i)=><span key={i} style={S.gc}>{g}</span>)}</div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={S.lbl}>Weekly Schedule</div>
        <div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap"}}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day,i)=>{
            const w=prog.sched[i]; const isR=w==="Rest";
            return <div key={i} style={{flex:1,minWidth:38,padding:"6px 4px",borderRadius:6,textAlign:"center",background:isR?"rgba(255,255,255,0.04)":m.bg,border:`1px solid ${isR?"rgba(255,255,255,0.08)":m.color+"40"}`}}>
              <div style={{fontSize:9,color:"#64748b",marginBottom:2}}>{day}</div>
              <div style={{fontSize:8,color:isR?"#475569":m.color,fontWeight:600,lineHeight:1.3}}>{isR?"REST":w}</div>
            </div>;
          })}
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={S.lbl}>Workouts ({Object.keys(prog.workouts).length})</div>
        {Object.entries(prog.workouts).map(([wn,w])=>(
          <div key={wn} style={{marginTop:8,background:"rgba(255,255,255,0.03)",borderRadius:8,border:"1px solid rgba(255,255,255,0.07)"}}>
            <button onClick={()=>setWOpen(wOpen===wn?null:wn)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:"transparent",border:"none",cursor:"pointer"}}>
              <span style={{color:"#e2e8f0",fontWeight:600,fontSize:13}}>{wn}</span>
              <span style={{color:"#64748b",fontSize:11}}>{w.focus} {wOpen===wn?"▲":"▼"}</span>
            </button>
            {wOpen===wn&&(
              <div style={{padding:"0 12px 12px"}}>
                {w.exs.map((ex,i)=>(
                  <div key={i} style={{display:"flex",gap:10,padding:"6px 0",borderTop:"1px solid rgba(255,255,255,0.04)",alignItems:"flex-start"}}>
                    <span style={{color:m.color,fontWeight:700,minWidth:18,fontSize:12,paddingTop:1}}>{i+1}.</span>
                    <div style={{flex:1}}>
                      <div style={{color:"#e2e8f0",fontSize:13,fontWeight:500}}>{getN(ex.id)}</div>
                      <div style={{display:"flex",gap:6,marginTop:3,flexWrap:"wrap",alignItems:"center"}}>
                        {ex.sets&&<span style={{color:"#64748b",fontSize:11}}>{ex.sets} sets</span>}
                        {ex.reps&&<span style={{color:"#64748b",fontSize:11}}>× {ex.reps}</span>}
                        {ex.rir&&<span style={{background:"rgba(245,158,11,0.15)",color:"#f59e0b",fontSize:11,fontWeight:700,padding:"1px 6px",borderRadius:4}}>RIR {ex.rir}</span>}
                        {ex.rpe&&<span style={{color:"#475569",fontSize:10}}>RPE {ex.rpe}</span>}
                        {ex.rest&&<span style={{color:"#475569",fontSize:10}}>· {ex.rest}</span>}
                      </div>
                      {ex.notes&&<div style={{color:"#475569",fontSize:11,marginTop:3,fontStyle:"italic"}}>{ex.notes}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {!isActive
          ?<button onClick={()=>saveProg({id:prog.id,startDate:new Date().toISOString()})} style={S.bp}>▶ Start Program</button>
          :<button onClick={()=>saveProg(null)} style={S.bd}>Stop Program</button>
        }
        <button onClick={()=>setView("log")} style={S.bs}>Log a Session</button>
      </div>
    </div>
  );
}

function WorkoutLogger({activeProg,saveSession,setView,allExercises,saveCustomExercise,sessions,editingSession,onCancelEdit}){
  const isEditing=!!editingSession;
  const [mode,setMode]=useState(isEditing?"active":null);
  const [selW,setSelW]=useState(isEditing?editingSession.workoutName:null);
  const [exercises,setExercises]=useState(()=>isEditing?(editingSession.exercises?.map(ex=>({
    uid:Date.now()+Math.random(),name:ex.name,notes:ex.notes||"",
    tSets:ex.tSets||"3",tReps:ex.tReps||"8-12",tRpe:ex.tRpe||"8",tRir:ex.tRir||"2",tRest:ex.tRest||"90 sec",
    sets:(ex.sets?.length?ex.sets.map(s=>({...s,done:false})):[{w:"",r:"",rpe:"",rir:"",done:false}])
  }))||[]):[]);
  const [name,setName]=useState(isEditing?editingSession.name:"");
  const [sessionNotes,setSessionNotes]=useState(isEditing?editingSession.sessionNotes||"":"");
  const [query,setQuery]=useState("");
  const [selCat,setSelCat]=useState("chest");
  const [saved,setSaved]=useState(false);
  const [restSecs,setRestSecs]=useState(null);
  const [customName,setCustomName]=useState("");
  const [customCat,setCustomCat]=useState("chest");
  const [showCustomCat,setShowCustomCat]=useState(false);
  const [dimSug,setDimSug]=useState({});
  const timerRef=useRef(null);

  const prog=activeProg?PROGRAMS.find(p=>p.id===activeProg.id):null;
  const CATS_ALL=[...new Set(allExercises.map(e=>e.cat))];

  const startTimer=(s)=>{
    if(timerRef.current) clearInterval(timerRef.current);
    setRestSecs(s);
    timerRef.current=setInterval(()=>setRestSecs(prev=>{
      if(prev<=1){clearInterval(timerRef.current);return null;}
      return prev-1;
    }),1000);
  };
  useEffect(()=>()=>{if(timerRef.current)clearInterval(timerRef.current)},[]);

  const loadWorkout=(wn)=>{
    if(!prog) return;
    const w=prog.workouts[wn];
    setSelW(wn); setName(`${prog.name} – ${wn}`);
    setExercises(w.exs.map(ex=>({
      uid:Date.now()+Math.random(),name:getN(ex.id),
      tSets:String(ex.sets),tReps:ex.reps,tRpe:ex.rpe,tRir:ex.rir||"",tRest:ex.rest,notes:ex.notes||"",
      sets:Array.from({length:parseInt(String(ex.sets))||3},()=>({w:"",r:"",rpe:"",rir:"",done:false}))
    })));
    setMode("active");
  };

  const addEx=(ex)=>setExercises(p=>[...p,{
    uid:Date.now()+Math.random(),name:ex.name,
    tSets:"3",tReps:"8-12",tRpe:"8",tRir:"2",tRest:"90 sec",notes:"",
    sets:[{w:"",r:"",rpe:"",rir:"",done:false}]
  }]);

  const handleCustomAdd=()=>{
    if(!customName.trim()) return;
    if(!showCustomCat){setShowCustomCat(true);return;}
    saveCustomExercise({id:"custom_"+Date.now(),name:customName.trim(),cat:customCat,isCustom:true});
    addEx({name:customName.trim()});
    setCustomName(""); setShowCustomCat(false);
  };

  const upSet=(ei,si,f,v)=>setExercises(p=>p.map((ex,i)=>i!==ei?ex:{...ex,sets:ex.sets.map((s,j)=>j!==si?s:{...s,[f]:v})}));
  const addSet=(ei)=>setExercises(p=>p.map((ex,i)=>i!==ei?ex:{...ex,sets:[...ex.sets,{w:"",r:"",rpe:"",rir:"",done:false}]}));
  const remSet=(ei,si)=>setExercises(p=>p.map((ex,i)=>i!==ei?ex:{...ex,sets:ex.sets.filter((_,j)=>j!==si)}));
  const remEx=(ei)=>setExercises(p=>p.filter((_,i)=>i!==ei));

  const handleSave=async()=>{
    const session={
      id:isEditing?editingSession.id:Date.now(),
      date:isEditing?editingSession.date:new Date().toISOString(),
      name:name||"Workout "+new Date().toLocaleDateString(),
      progId:activeProg?.id||null, workoutName:selW, sessionNotes,
      exercises:exercises.map(ex=>({name:ex.name,notes:ex.notes,tReps:ex.tReps,tRpe:ex.tRpe,tRir:ex.tRir,sets:ex.sets.filter(s=>s.w||s.r)}))
    };
    await saveSession(session);
    if(isEditing){onCancelEdit();return;}
    setSaved(true);
    setTimeout(()=>setView("history"),1200);
  };

  const catExs=query?allExercises.filter(e=>e.name.toLowerCase().includes(query.toLowerCase())).slice(0,14):allExercises.filter(e=>e.cat===selCat);

  if(saved) return(
    <div style={{...S.pg,textAlign:"center",paddingTop:80}}>
      <div style={{fontSize:60,marginBottom:16}}>✅</div>
      <div style={{color:"#4ade80",fontSize:24,fontWeight:700}}>Session Saved!</div>
      <div style={{color:"#64748b",marginTop:8}}>Great work 💪</div>
    </div>
  );

  return(
    <div style={S.pg}>
      <div style={S.pgH}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h1 style={S.pgT}>{isEditing?"Edit Session":"Log Workout"}</h1>
          {isEditing&&<button onClick={onCancelEdit} style={S.bs}>← Cancel</button>}
        </div>
      </div>

      {restSecs!==null&&(
        <div style={{position:"fixed",top:72,right:16,zIndex:100,background:"#0f172a",border:"2px solid #f59e0b",borderRadius:14,padding:"12px 20px",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
          <div style={{color:"#64748b",fontSize:10,marginBottom:4}}>REST TIMER</div>
          <div style={{color:restSecs<=10?"#ef4444":"#f59e0b",fontSize:34,fontWeight:900,fontFamily:"monospace"}}>
            {Math.floor(restSecs/60)}:{String(restSecs%60).padStart(2,"0")}
          </div>
          <button onClick={()=>{clearInterval(timerRef.current);setRestSecs(null);}} style={{marginTop:6,background:"transparent",border:"1px solid #475569",borderRadius:6,color:"#64748b",fontSize:11,padding:"3px 10px",cursor:"pointer"}}>Skip</button>
        </div>
      )}

      {!mode&&(
        <div style={S.card}>
          <h2 style={S.cT}>Choose Logging Mode</h2>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:16}}>
            {prog&&<button onClick={()=>setMode("prog_select")} style={{...S.modeC,borderColor:"rgba(245,158,11,0.3)"}}>
              <div style={{fontSize:28,marginBottom:8}}>📋</div>
              <div style={{color:"#f1f5f9",fontWeight:600}}>Program Workout</div>
              <div style={{color:"#64748b",fontSize:12,marginTop:4}}>{prog.name}</div>
            </button>}
            <button onClick={()=>{setMode("active");setName("Free Workout");}} style={{...S.modeC,borderColor:"rgba(74,222,128,0.3)"}}>
              <div style={{fontSize:28,marginBottom:8}}>✏️</div>
              <div style={{color:"#f1f5f9",fontWeight:600}}>Free Workout</div>
              <div style={{color:"#64748b",fontSize:12,marginTop:4}}>Pick your own exercises</div>
            </button>
          </div>
        </div>
      )}

      {mode==="prog_select"&&prog&&(
        <div style={S.card}>
          <h2 style={S.cT}>Select Workout</h2>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
            {Object.keys(prog.workouts).map(wn=>(
              <button key={wn} onClick={()=>loadWorkout(wn)} style={{...S.chip,padding:"10px 14px"}}>{wn}</button>
            ))}
          </div>
          <button onClick={()=>setMode(null)} style={{...S.bs,marginTop:12}}>← Back</button>
        </div>
      )}

      {mode==="active"&&<>
        <div style={S.card}>
          <div style={S.lbl}>Session Name</div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Upper A – Week 2" style={{...S.inp,marginTop:6}}/>
          <div style={{marginTop:12}}>
            <div style={S.lbl}>Session Notes <span style={{color:"#475569",fontWeight:400,fontSize:11}}>(optional)</span></div>
            <textarea value={sessionNotes} onChange={e=>setSessionNotes(e.target.value)}
              placeholder="How did it feel? Any notes..."
              style={{...S.inp,marginTop:6,height:56,resize:"none",lineHeight:1.5,fontFamily:"inherit"}}/>
          </div>
        </div>

        <div style={S.card}>
          <h2 style={{...S.cT,marginBottom:10}}>Add Exercises</h2>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search exercises..." style={{...S.inp,marginBottom:10}}/>
          {!query&&(
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              {CATS_ALL.map(c=><button key={c} onClick={()=>setSelCat(c)} style={{...S.chip,fontSize:11,padding:"4px 10px",...(selCat===c?S.chipA:{})}}>{c}</button>)}
            </div>
          )}
          <div style={{maxHeight:180,overflowY:"auto"}}>
            {catExs.map(ex=>(
              <button key={ex.id||ex.name} onClick={()=>addEx(ex)}
                style={{display:"block",width:"100%",textAlign:"left",padding:"8px 10px",background:"transparent",border:"none",cursor:"pointer",color:"#e2e8f0",borderRadius:6,marginBottom:2,fontSize:13}}>
                + {ex.name} <span style={{color:"#475569",fontSize:11}}>({ex.cat})</span>
                {ex.isCustom&&<span style={{color:"#a78bfa",fontSize:10,marginLeft:6,background:"rgba(139,92,246,0.12)",border:"1px solid rgba(139,92,246,0.25)",borderRadius:4,padding:"1px 5px"}}>custom</span>}
              </button>
            ))}
          </div>
          {/* Custom exercise */}
          <div style={{marginTop:10,background:"rgba(255,255,255,0.02)",borderRadius:10,padding:"10px 12px",border:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{display:"flex",gap:8}}>
              <input value={customName} onChange={e=>{setCustomName(e.target.value);if(showCustomCat)setShowCustomCat(false);}}
                placeholder="Custom exercise name..." style={{...S.inp,flex:1}}
                onKeyDown={e=>{if(e.key==="Enter")handleCustomAdd();}}/>
              <button onClick={handleCustomAdd} style={S.bp}>{showCustomCat?"Save":"Add"}</button>
            </div>
            {showCustomCat&&(
              <div style={{marginTop:10}}>
                <div style={{...S.lbl,marginBottom:6}}>Muscle group <span style={{color:"#64748b",fontWeight:400,fontSize:11}}>(saves to your library)</span></div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {["chest","back","shoulders","legs","glutes","arms","core","athletic","calisthenics"].map(c=>(
                    <button key={c} onClick={()=>setCustomCat(c)} style={{...S.chip,fontSize:11,padding:"4px 10px",...(customCat===c?S.chipA:{})}}>{c}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {exercises.map((ex,ei)=>{
          const last=getLastExData(ex.name,sessions);
          const sugg=last?nextWeight(last.w,ex.name):null;
          return(
          <div key={ex.uid} style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{flex:1}}>
                <div style={{color:"#f1f5f9",fontWeight:700,fontSize:15}}>{ex.name}</div>
                <div style={{color:"#64748b",fontSize:12,marginTop:3}}>
                  Target: {ex.tSets} sets × {ex.tReps}
                  {ex.tRir&&<span style={{color:"#f59e0b",fontWeight:600}}> · RIR {ex.tRir}</span>}
                  <span style={{color:"#475569"}}> (RPE {ex.tRpe})</span>
                  {" · "}{ex.tRest} rest
                </div>
                {ex.notes&&<div style={{color:"#475569",fontSize:11,marginTop:3,fontStyle:"italic"}}>{ex.notes}</div>}
              </div>
              <button onClick={()=>remEx(ei)} style={{background:"transparent",border:"none",color:"rgba(239,68,68,0.5)",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            </div>

            {last&&sugg&&!dimSug[ex.uid]&&(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:8,padding:"7px 10px",marginBottom:10}}>
                <span style={{color:"#f59e0b",fontSize:12}}>⬆ Last: <strong>{last.w}kg × {last.r}</strong> → try <strong>{sugg}kg</strong></span>
                <button onClick={()=>setDimSug(d=>({...d,[ex.uid]:true}))} style={{background:"transparent",border:"none",color:"#475569",cursor:"pointer",fontSize:14,padding:"0 4px"}}>×</button>
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"24px 1fr 1fr 1fr 1fr 32px 24px",gap:4,marginBottom:6}}>
              {["#","Wt","Reps","RIR","RPE","✓",""].map((h,i)=>(
                <div key={i} style={{color:i===3?"#f59e0b":"#475569",fontSize:10,textAlign:"center",fontWeight:i===3?700:400}}>{h}</div>
              ))}
            </div>
            {ex.sets.map((set,si)=>(
              <div key={si} style={{display:"grid",gridTemplateColumns:"24px 1fr 1fr 1fr 1fr 32px 24px",gap:4,marginBottom:4,alignItems:"center"}}>
                <div style={{color:"#64748b",fontSize:11,textAlign:"center"}}>{si+1}</div>
                <input value={set.w} onChange={e=>upSet(ei,si,"w",e.target.value)} placeholder="kg" style={{...S.sinp,...(set.done?S.sinpD:{})}}/>
                <input value={set.r} onChange={e=>upSet(ei,si,"r",e.target.value)} placeholder={ex.tReps} style={{...S.sinp,...(set.done?S.sinpD:{})}}/>
                <input value={set.rir} onChange={e=>upSet(ei,si,"rir",e.target.value)} placeholder={ex.tRir||"RIR"}
                  style={{...S.sinp,borderColor:set.done?"rgba(74,222,128,0.3)":"rgba(245,158,11,0.35)",color:set.done?"#4ade80":"#f59e0b"}}/>
                <input value={set.rpe} onChange={e=>upSet(ei,si,"rpe",e.target.value)} placeholder={ex.tRpe} style={{...S.sinp,...(set.done?S.sinpD:{})}}/>
                <button onClick={()=>{upSet(ei,si,"done",!set.done);if(!set.done)startTimer(90);}} style={{...S.doneB,...(set.done?S.doneBA:{})}}>{set.done?"✓":"○"}</button>
                <button onClick={()=>remSet(ei,si)} style={{background:"transparent",border:"none",color:"rgba(239,68,68,0.4)",cursor:"pointer",fontSize:14}}>×</button>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
              <button onClick={()=>addSet(ei)} style={S.addS}>+ Set</button>
              {[60,90,120,180].map(s=><button key={s} onClick={()=>startTimer(s)} style={S.tmrB}>⏱{s}s</button>)}
            </div>
          </div>
        );})}

        {exercises.length>0&&(
          <button onClick={handleSave} style={{...S.bp,width:"100%",padding:"15px",fontSize:16,fontWeight:700,borderRadius:12}}>
            {isEditing?"💾 Save Changes":"💾 Save Session"} ({exercises.length} exercises)
          </button>
        )}
      </>}
    </div>
  );
}

// ── SHARED SESSION DETAIL (used by all calendar views + list) ────────────────
function SessionDetail({session}){
  return(
    <div>
      {session.notes&&<div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"8px 12px",marginBottom:10,color:"#94a3b8",fontSize:12,fontStyle:"italic",lineHeight:1.5}}>💬 {session.notes}</div>}
      {session.exercises?.length>0?(
        session.exercises.map((ex,i)=>(
          <div key={i} style={{paddingTop:10,marginTop:i>0?2:0,borderTop:i>0?"1px solid rgba(255,255,255,0.05)":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
              <span style={{color:"#e2e8f0",fontWeight:600,fontSize:13}}>{ex.name}</span>
              <span style={{color:"#f59e0b",fontSize:11,fontWeight:700}}>
                {ex.sets?.reduce((a,s)=>(parseFloat(s.w)||0)*(parseFloat(s.r)||0)+a,0)>0
                  ? ex.sets.reduce((a,s)=>(parseFloat(s.w)||0)*(parseFloat(s.r)||0)+a,0).toLocaleString()+" kg"
                  : ""}
              </span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {ex.sets?.filter(st=>st.w||st.r).map((st,j)=>(
                <div key={j} style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.18)",borderRadius:6,padding:"4px 8px",fontSize:11}}>
                  <span style={{color:"#f1f5f9",fontWeight:600}}>{st.w&&`${st.w}kg`}{st.w&&st.r&&" × "}{st.r&&`${st.r}`}</span>
                  {st.rir!=null&&st.rir!==""&&<span style={{color:"#f59e0b",fontWeight:700,marginLeft:5}}>RIR {st.rir}</span>}
                  {st.rpe&&<span style={{color:"#94a3b8",marginLeft:4}}>RPE {st.rpe}</span>}
                </div>
              ))}
            </div>
          </div>
        ))
      ):(
        <div style={{color:"#475569",fontSize:12,paddingTop:6}}>No exercises logged</div>
      )}
    </div>
  );
}

// ── POPOVER POSITION (flip+shift) ────────────────────────
function calcPopoverPos(cellRect,containerRect,cardW,cardH){
  const vp={w:window.innerWidth,h:window.innerHeight};
  const PAD=8;
  // anchor relative to container
  const anchorLeft=cellRect.left-containerRect.left;
  const anchorTop=cellRect.bottom-containerRect.top+6;
  const anchorTopAbove=cellRect.top-containerRect.top-cardH-6;
  // horizontal: try left-align to cell, shift if clips right
  let left=anchorLeft;
  if(left+cardW>containerRect.width-PAD) left=containerRect.width-cardW-PAD;
  if(left<PAD) left=PAD;
  // arrow offset relative to card
  const arrowLeft=Math.max(8,Math.min(anchorLeft-left+cellRect.width/2-6,cardW-20));
  // vertical: flip above if clips bottom of viewport
  const wouldClipBottom=cellRect.bottom+cardH+6>vp.h-PAD;
  const top=wouldClipBottom?anchorTopAbove:anchorTop;
  const flipped=wouldClipBottom;
  return{left,top,arrowLeft,flipped};
}

// ── CALENDAR HELPERS ─────────────────────────────────────
const CAL_MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CAL_MONTHS_FULL  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CAL_DAYS_SHORT   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function calToday(){
  const n=new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`;
}
function calFmt(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function calSessionsByDate(sessions){
  const m={};
  sessions.forEach(s=>{
    const key=s.date.slice(0,10);
    if(!m[key]) m[key]=[];
    m[key].push(s);
  });
  return m;
}
function calVolForDate(sbd,ds){
  return (sbd[ds]||[]).reduce((a,s)=>{
    let v=0;
    s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));
    return a+v;
  },0);
}
function calMaxVol(sessions){
  const byDate={};
  sessions.forEach(s=>{
    const key=s.date.slice(0,10);
    s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{
      byDate[key]=(byDate[key]||0)+(parseFloat(set.w)||0)*(parseFloat(set.r)||0);
    }));
  });
  return Math.max(1,...Object.values(byDate));
}
function calIntensity(sbd,ds,maxV){
  const vol=calVolForDate(sbd,ds);
  return vol===0?0:0.2+(vol/maxV)*0.8;
}
function heatBg(intensity){
  if(intensity===0) return "rgba(255,255,255,0.02)";
  const r=Math.round(120+intensity*135),g=Math.round(60+intensity*98),b=Math.round(0+intensity*11);
  return `rgba(${r},${g},${b},${0.25+intensity*0.65})`;
}

// Selected=white, today=green, trained=subtle amber border
function dayCellBorder(isToday,isSel,trained){
  if(isToday)      return "2px solid #4ade80";
  if(isSel&&trained) return "2px solid #f1f5f9";
  if(trained)      return "1px solid rgba(245,158,11,0.3)";
  return "1px solid transparent";
}
function dayCellNumColor(isToday,isSel,trained,intensity){
  if(isToday)  return "#4ade80";
  if(isSel&&trained) return "#f1f5f9";
  if(trained&&intensity>0.55) return "rgba(0,0,0,0.75)";
  if(trained)  return "#fde68a";
  return "#475569";
}

function HeatLegend(){
  return(
    <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"flex-end",flexWrap:"wrap"}}>
      <span style={{fontSize:10,color:"#64748b"}}>Low</span>
      {[0.15,0.35,0.55,0.75,1.0].map(a=>(
        <div key={a} style={{width:13,height:13,borderRadius:3,background:heatBg(a)}}/>
      ))}
      <span style={{fontSize:10,color:"#64748b"}}>High</span>
      <div style={{width:1,height:13,background:"rgba(255,255,255,0.07)",margin:"0 4px"}}/>
      <div style={{width:13,height:13,borderRadius:3,border:"2px solid #4ade80",background:"rgba(74,222,128,0.1)"}}/>
      <span style={{fontSize:10,color:"#4ade80",fontWeight:600}}>Today</span>
      <div style={{width:1,height:13,background:"rgba(255,255,255,0.07)",margin:"0 4px"}}/>
      <div style={{width:13,height:13,borderRadius:3,border:"2px solid #f1f5f9",background:"rgba(241,245,249,0.08)"}}/>
      <span style={{fontSize:10,color:"#f1f5f9",fontWeight:600}}>Selected</span>
    </div>
  );
}

// ── CAL DAY VIEW ──────────────────────────────────────────
function CalDayView({selectedDay,setSelectedDay,sbd}){
  const [expSession,setExpSession]=useState(null);
  const sessions=sbd[selectedDay]||[];
  const totalVol=sessions.reduce((a,s)=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return a+v;},0);
  const TODAY=calToday();
  const isToday=selectedDay===TODAY;
  const shift=(n)=>{const d=new Date(selectedDay+"T12:00:00");d.setDate(d.getDate()+n);setSelectedDay(calFmt(d));setExpSession(null);};
  const nbtn={background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:13,fontFamily:"inherit",fontWeight:600,outline:"none",WebkitTapHighlightColor:"transparent"};
  return(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"18px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button onClick={()=>shift(-1)} style={nbtn}>← Day</button>
        <div style={{textAlign:"center"}}>
          <div style={{fontWeight:700,fontSize:15,color:isToday?"#4ade80":"#f1f5f9"}}>
            {new Date(selectedDay+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
          </div>
          {isToday&&<div style={{fontSize:11,color:"#4ade80",fontWeight:600,marginTop:2}}>Today</div>}
        </div>
        <button onClick={()=>shift(1)} style={nbtn}>Day →</button>
      </div>
      {sessions.length===0?(
        <div style={{textAlign:"center",padding:"32px 0",color:"#64748b"}}>
          <div style={{fontSize:36,marginBottom:10}}>🛋️</div>
          <div style={{fontWeight:600,color:"#94a3b8"}}>Rest Day</div>
          <div style={{fontSize:12,marginTop:4}}>No sessions logged</div>
        </div>
      ):(
        <>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[
              {v:sessions.length,l:"session"+(sessions.length>1?"s":""),c:"#f59e0b",bg:"rgba(245,158,11,0.08)",bd:"rgba(245,158,11,0.2)"},
              {v:totalVol>0?totalVol.toLocaleString():"—",l:"kg volume",c:"#4ade80",bg:"rgba(74,222,128,0.08)",bd:"rgba(74,222,128,0.2)"},
              {v:sessions.reduce((a,s)=>a+(s.exercises?.length||0),0),l:"exercises",c:"#a78bfa",bg:"rgba(139,92,246,0.08)",bd:"rgba(139,92,246,0.2)"},
            ].map((st,i)=>(
              <div key={i} style={{flex:1,background:st.bg,border:`1px solid ${st.bd}`,borderRadius:8,padding:"10px 12px"}}>
                <div style={{color:st.c,fontWeight:700,fontSize:20}}>{st.v}</div>
                <div style={{color:"#64748b",fontSize:11}}>{st.l}</div>
              </div>
            ))}
          </div>
          {sessions.map((s,i)=>{
            const sv=(()=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return v;})();
            const isExp=expSession===s.id;
            return(
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${isExp?"rgba(245,158,11,0.3)":"rgba(255,255,255,0.06)"}`,borderRadius:10,marginBottom:8,overflow:"hidden",transition:"border-color 0.15s"}}>
                <div onClick={()=>setExpSession(isExp?null:s.id)}
                  style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
                  <div>
                    <div style={{fontWeight:700,color:"#f1f5f9",fontSize:13}}>{s.name}</div>
                    <div style={{color:"#64748b",fontSize:11,marginTop:2}}>{s.exercises?.length||0} exercises{sv>0?` · ${sv.toLocaleString()} kg`:""}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:"#475569",fontSize:14,transition:"transform 0.2s",display:"inline-block",transform:isExp?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
                  </div>
                </div>
                <div style={{maxHeight:isExp?800:0,overflow:"hidden",transition:"max-height 0.3s cubic-bezier(0.4,0,0.2,1)"}}>
                  <div style={{padding:"0 14px 14px"}}>
                    <SessionDetail session={s}/>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

// ── CAL WEEK VIEW ─────────────────────────────────────────
function CalWeekView({currentDate,setCurrentDate,selectedDay,setSelectedDay,sbd,maxV}){
  const [expSession,setExpSession]=useState(null);
  const TODAY=calToday();
  const getMonday=(d)=>{const day=d.getDay(),diff=d.getDate()-day+(day===0?-6:1);return new Date(d.getFullYear(),d.getMonth(),diff,12);};
  const monday=getMonday(currentDate);
  const weekDays=Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return d;});
  const dayLbls=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const shiftWeek=(n)=>{const d=new Date(currentDate);d.setDate(d.getDate()+n*7);setCurrentDate(d);setExpSession(null);};
  const s0=weekDays[0],s6=weekDays[6];
  const wLabel=s0.getMonth()===s6.getMonth()
    ?`${CAL_MONTHS_FULL[s0.getMonth()]} ${s0.getDate()}–${s6.getDate()}, ${s0.getFullYear()}`
    :`${CAL_MONTHS_SHORT[s0.getMonth()]} ${s0.getDate()} – ${CAL_MONTHS_SHORT[s6.getMonth()]} ${s6.getDate()}, ${s0.getFullYear()}`;
  const totalVol=weekDays.reduce((a,d)=>a+calVolForDate(sbd,calFmt(d)),0);
  const trainedDays=weekDays.filter(d=>(sbd[calFmt(d)]||[]).length>0).length;
  const nbtn={background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,outline:"none",WebkitTapHighlightColor:"transparent"};

  const handleDayClick=(ds)=>{
    if(ds===selectedDay){setSelectedDay(null);setExpSession(null);}
    else{setSelectedDay(ds);setExpSession(null);}
  };

  const selSessions=selectedDay?(sbd[selectedDay]||[]):[];

  return(
    <div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"14px 14px",marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <button onClick={()=>shiftWeek(-1)} style={nbtn}>← Week</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontWeight:700,fontSize:13}}>{wLabel}</div>
            <div style={{color:"#64748b",fontSize:11,marginTop:1}}>{trainedDays} sessions{totalVol>0?` · ${totalVol.toLocaleString()} kg`:""}</div>
          </div>
          <button onClick={()=>shiftWeek(1)} style={nbtn}>Week →</button>
        </div>
        <HeatLegend/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:5,marginTop:12}}>
          {weekDays.map((d,i)=>{
            const ds=calFmt(d);
            const sessions=sbd[ds]||[];
            const trained=sessions.length>0;
            const isToday=ds===TODAY;
            const isSel=ds===selectedDay;
            const intensity=calIntensity(sbd,ds,maxV);
            const vol=calVolForDate(sbd,ds);
            return(
              <div key={i} onClick={()=>handleDayClick(ds)}
                style={{borderRadius:10,padding:"8px 6px",minHeight:100,background:heatBg(intensity),
                  border:dayCellBorder(isToday,isSel,trained),boxSizing:"border-box",
                  cursor:"pointer",transition:"all 0.12s",position:"relative",outline:"none",WebkitTapHighlightColor:"transparent"}}>
                <div style={{fontSize:9,color:isToday?"#4ade80":isSel&&trained?"#f1f5f9":"#64748b",fontWeight:700}}>{dayLbls[i]}</div>
                <div style={{fontSize:18,fontWeight:700,color:isToday?"#4ade80":"#f1f5f9",margin:"3px 0 5px"}}>{d.getDate()}</div>
                {trained?(
                  <>
                    {sessions.slice(0,2).map((s,j)=>(
                      <div key={j} style={{fontSize:8,background:"rgba(0,0,0,0.25)",color:"#fde68a",borderRadius:3,padding:"2px 4px",marginBottom:2,fontWeight:600,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>
                        {s.name.length>16?s.name.slice(0,16)+"…":s.name}
                      </div>
                    ))}
                    {sessions.length>2&&<div style={{fontSize:7,color:"rgba(253,230,138,0.7)"}}>+{sessions.length-2} more</div>}
                    {vol>0&&<div style={{position:"absolute",bottom:6,right:6,fontSize:8,color:"rgba(253,230,138,0.7)",fontWeight:700}}>{vol>=1000?(vol/1000).toFixed(1)+"k":vol}kg</div>}
                  </>
                ):(
                  <div style={{fontSize:9,color:"#475569",marginTop:4}}>Rest</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline expand panel */}
      <div style={{overflow:"hidden",maxHeight:selectedDay&&selSessions.length?1200:0,opacity:selectedDay&&selSessions.length?1:0,transition:"max-height 0.35s cubic-bezier(0.4,0,0.2,1),opacity 0.25s ease",marginBottom:selectedDay&&selSessions.length?10:0}}>
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,borderLeft:"3px solid #f59e0b",overflow:"hidden"}}>
          <div style={{padding:"12px 14px 4px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:13,color:"#f1f5f9"}}>
              {selectedDay&&new Date(selectedDay+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
            </span>
            <button onClick={()=>{setSelectedDay(null);setExpSession(null);}} style={{background:"transparent",border:"none",color:"#475569",cursor:"pointer",fontSize:18,fontFamily:"inherit",outline:"none",WebkitTapHighlightColor:"transparent"}}>×</button>
          </div>
          {selSessions.map((s,i)=>{
            const sv=(()=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return v;})();
            const isExp=expSession===s.id;
            return(
              <div key={i} style={{margin:"0 14px",marginBottom:8,background:"rgba(255,255,255,0.02)",border:`1px solid ${isExp?"rgba(245,158,11,0.3)":"rgba(255,255,255,0.06)"}`,borderRadius:10,overflow:"hidden",transition:"border-color 0.15s"}}>
                <div onClick={()=>setExpSession(isExp?null:s.id)}
                  style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
                  <div>
                    <div style={{fontWeight:700,color:"#f1f5f9",fontSize:13}}>{s.name}</div>
                    <div style={{color:"#64748b",fontSize:11,marginTop:2}}>{s.exercises?.length||0} exercises{sv>0?` · ${sv.toLocaleString()} kg`:""}</div>
                  </div>
                  <span style={{color:"#475569",fontSize:13,transition:"transform 0.2s",display:"inline-block",transform:isExp?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
                </div>
                <div style={{maxHeight:isExp?800:0,overflow:"hidden",transition:"max-height 0.3s cubic-bezier(0.4,0,0.2,1)"}}>
                  <div style={{padding:"0 12px 12px"}}><SessionDetail session={s}/></div>
                </div>
              </div>
            );
          })}
          <div style={{height:6}}/>
        </div>
      </div>
    </div>
  );
}

// ── CAL MONTH VIEW ────────────────────────────────────────
function CalMonthView({currentDate,setCurrentDate,selectedDay,setSelectedDay,sbd,maxV}){
  const TODAY=calToday();
  const month=currentDate.getMonth(),year=currentDate.getFullYear();
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const cells=[];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);
  const ds=(d)=>d?`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`:null;
  const shiftMonth=(n)=>{const d=new Date(currentDate);d.setMonth(d.getMonth()+n);setCurrentDate(d);setSelectedDay(null);};
  const totalVol=cells.reduce((a,d)=>a+calVolForDate(sbd,ds(d)||""),0);
  const trainedDays=cells.filter(d=>ds(d)&&(sbd[ds(d)]||[]).length>0).length;
  const nbtn={background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,outline:"none",WebkitTapHighlightColor:"transparent"};

  // Popover state
  const [popover,setPopover]=useState(null); // {ds, pos:{left,top,arrowLeft,flipped}, expSession}
  const [cardExpSession,setCardExpSession]=useState(null);
  const containerRef=useRef(null);
  const CARD_W=240, CARD_H_EST=220;

  const handleCellClick=(dStr,e)=>{
    if(!dStr||(sbd[dStr]||[]).length===0){setPopover(null);setCardExpSession(null);return;}
    if(popover?.ds===dStr){setPopover(null);setCardExpSession(null);return;}
    const cellRect=e.currentTarget.getBoundingClientRect();
    const containerRect=containerRef.current.getBoundingClientRect();
    const pos=calcPopoverPos(cellRect,containerRect,CARD_W,CARD_H_EST);
    setPopover({ds:dStr,pos});
    setCardExpSession(null);
    setSelectedDay(dStr);
  };

  // close popover when day changes externally
  useEffect(()=>{if(!selectedDay){setPopover(null);setCardExpSession(null);}},[selectedDay]);

  return(
    <div>
      <div ref={containerRef} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"14px 14px",marginBottom:10,position:"relative"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <button onClick={()=>shiftMonth(-1)} style={nbtn}>←</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontWeight:700,fontSize:14}}>{CAL_MONTHS_FULL[month]} {year}</div>
            <div style={{color:"#64748b",fontSize:11,marginTop:1}}>{trainedDays} sessions{totalVol>0?` · ${totalVol.toLocaleString()} kg`:""}</div>
          </div>
          <button onClick={()=>shiftMonth(1)} style={nbtn}>→</button>
        </div>
        <HeatLegend/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,margin:"10px 0 4px"}}>
          {CAL_DAYS_SHORT.map(d=><div key={d} style={{textAlign:"center",fontSize:9,color:"#475569",fontWeight:600,padding:"2px 0"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
          {cells.map((d,i)=>{
            const dStr=ds(d);
            const sessions=dStr?(sbd[dStr]||[]):[];
            const trained=sessions.length>0;
            const isToday=dStr===TODAY;
            const isSel=dStr===selectedDay;
            const intensity=dStr?calIntensity(sbd,dStr,maxV):0;
            return(
              <div key={i} onClick={(e)=>{if(d&&dStr)handleCellClick(dStr,e);}}
                style={{aspectRatio:"1",borderRadius:6,display:"flex",flexDirection:"column",
                  alignItems:"center",justifyContent:"center",position:"relative",
                  background:d?heatBg(intensity):"transparent",
                  border:d?dayCellBorder(isToday,isSel,trained):"1px solid transparent",
                  boxSizing:"border-box",cursor:d?"pointer":"default",transition:"all 0.1s",outline:"none",WebkitTapHighlightColor:"transparent"}}>
                {d&&<>
                  <span style={{fontSize:11,fontWeight:trained||isToday?700:400,color:dayCellNumColor(isToday,isSel,trained,intensity)}}>{d}</span>
                  {trained&&<div style={{width:3,height:3,borderRadius:"50%",background:intensity>0.55?"rgba(0,0,0,0.4)":"#f59e0b",marginTop:1}}/>}
                  {sessions.length>1&&<span style={{fontSize:7,color:intensity>0.55?"rgba(0,0,0,0.5)":"#f59e0b",fontWeight:700}}>×{sessions.length}</span>}
                </>}
              </div>
            );
          })}
        </div>

        {/* Floating card popover */}
        {popover&&sbd[popover.ds]&&(
          <div onClick={e=>e.stopPropagation()} style={{
            position:"absolute",
            left:popover.pos.left,
            top:popover.pos.top,
            width:CARD_W,
            background:"#0d1627",
            border:"1px solid rgba(245,158,11,0.3)",
            borderRadius:12,
            zIndex:50,
            boxShadow:"0 12px 40px rgba(0,0,0,0.7)",
            animation:"popIn 0.18s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <style>{`@keyframes popIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}`}</style>
            {/* Arrow */}
            <div style={{
              position:"absolute",
              ...(popover.pos.flipped
                ?{bottom:-6,top:"auto"}
                :{top:-6}),
              left:popover.pos.arrowLeft,
              width:12,height:12,
              background:"#0d1627",
              border:"1px solid rgba(245,158,11,0.3)",
              transform:popover.pos.flipped?"rotate(225deg)":"rotate(45deg)",
              ...(popover.pos.flipped?{borderTop:"none",borderLeft:"none"}:{borderBottom:"none",borderRight:"none"}),
            }}/>
            {/* Header */}
            <div style={{padding:"12px 14px 10px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{color:"#f59e0b",fontSize:9,fontWeight:700,letterSpacing:1,marginBottom:3}}>
                    {new Date(popover.ds+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase()}
                  </div>
                  {sbd[popover.ds].map((s,i)=>(
                    <div key={i} style={{color:"#f1f5f9",fontWeight:700,fontSize:12,lineHeight:1.3}}>{s.name}</div>
                  ))}
                </div>
                <button onClick={()=>{setPopover(null);setSelectedDay(null);setCardExpSession(null);}}
                  style={{background:"transparent",border:"none",color:"#475569",cursor:"pointer",fontSize:16,fontFamily:"inherit",outline:"none",WebkitTapHighlightColor:"transparent",flexShrink:0,marginLeft:8}}>×</button>
              </div>
              <div style={{display:"flex",gap:12,marginTop:8}}>
                {(()=>{
                  const sessions=sbd[popover.ds];
                  const vol=sessions.reduce((a,s)=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return a+v;},0);
                  const exCount=sessions.reduce((a,s)=>a+(s.exercises?.length||0),0);
                  return[
                    {v:vol>0?(vol>=1000?(vol/1000).toFixed(1)+"k":vol)+"kg":"—",c:"#f59e0b"},
                    {v:exCount+" ex",c:"#a78bfa"},
                  ].map((st,i)=><span key={i} style={{color:st.c,fontWeight:700,fontSize:12}}>{st.v}</span>);
                })()}
              </div>
            </div>
            {/* Exercise list with expand */}
            <div style={{padding:"8px 14px 4px",maxHeight:280,overflowY:"auto"}}>
              {sbd[popover.ds].map((s,si)=>(
                <div key={si} style={{marginBottom:6,background:"rgba(255,255,255,0.02)",border:`1px solid ${cardExpSession===s.id?"rgba(245,158,11,0.25)":"rgba(255,255,255,0.06)"}`,borderRadius:8,overflow:"hidden",transition:"border-color 0.15s"}}>
                  <div onClick={()=>setCardExpSession(cardExpSession===s.id?null:s.id)}
                    style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
                    <span style={{color:"#f1f5f9",fontSize:11,fontWeight:600}}>{s.name.length>24?s.name.slice(0,24)+"…":s.name}</span>
                    <span style={{color:"#475569",fontSize:11,transition:"transform 0.2s",display:"inline-block",transform:cardExpSession===s.id?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
                  </div>
                  <div style={{maxHeight:cardExpSession===s.id?600:0,overflow:"hidden",transition:"max-height 0.3s cubic-bezier(0.4,0,0.2,1)"}}>
                    <div style={{padding:"0 10px 10px"}}><SessionDetail session={s}/></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{height:6}}/>
          </div>
        )}
      </div>
      {/* Backdrop to dismiss popover */}
      {popover&&<div onClick={()=>{setPopover(null);setSelectedDay(null);setCardExpSession(null);}} style={{position:"fixed",inset:0,zIndex:49}}/>}
    </div>
  );
}

// ── CAL YEAR VIEW ─────────────────────────────────────────
function CalYearView({currentDate,setCurrentDate,selectedDay,setSelectedDay,sbd,maxV,sessions}){
  const TODAY=calToday();
  const year=currentDate.getFullYear();
  const [sheetOpen,setSheetOpen]=useState(false);
  const [sheetVisible,setSheetVisible]=useState(false);
  const [expSession,setExpSession]=useState(null);

  const yearSessions=sessions.filter(s=>s.date.slice(0,4)===String(year));
  const yearVol=yearSessions.reduce((a,s)=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return a+v;},0);
  const yearDays=new Set(yearSessions.map(s=>s.date.slice(0,10))).size;
  const bestMonth=(()=>{
    const byM={};
    yearSessions.forEach(s=>{const m=s.date.slice(0,7);let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));byM[m]=(byM[m]||0)+v;});
    const best=Object.entries(byM).sort((a,b)=>b[1]-a[1])[0];
    return best?CAL_MONTHS_SHORT[parseInt(best[0].slice(5,7))-1]:"—";
  })();
  const shiftYear=(n)=>{const d=new Date(currentDate);d.setFullYear(d.getFullYear()+n);setCurrentDate(d);};
  const nbtn={background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#94a3b8",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,outline:"none",WebkitTapHighlightColor:"transparent"};

  const openSheet=(ds)=>{
    setSelectedDay(ds);
    setExpSession(null);
    setSheetOpen(true);
    setTimeout(()=>setSheetVisible(true),10);
  };
  const closeSheet=()=>{
    setSheetVisible(false);
    setTimeout(()=>{setSheetOpen(false);setSelectedDay(null);setExpSession(null);},320);
  };

  const sheetSessions=selectedDay?(sbd[selectedDay]||[]):[];

  return(
    <div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"14px 14px",marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <button onClick={()=>shiftYear(-1)} style={nbtn}>← {year-1}</button>
          <span style={{fontWeight:700,fontSize:18,letterSpacing:1}}>{year}</span>
          <button onClick={()=>shiftYear(1)} style={nbtn}>{year+1} →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
          {[
            {v:yearDays,l:"Training days",c:"#f59e0b"},
            {v:yearVol>0?(yearVol/1000).toFixed(1)+"k kg":"—",l:"Total volume",c:"#4ade80"},
            {v:bestMonth,l:"Best month",c:"#a78bfa"},
          ].map((st,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"10px 12px"}}>
              <div style={{color:st.c,fontWeight:700,fontSize:20}}>{st.v}</div>
              <div style={{color:"#64748b",fontSize:11,marginTop:2}}>{st.l}</div>
            </div>
          ))}
        </div>
        <HeatLegend/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:14}}>
          {Array.from({length:12},(_,m)=>{
            const firstDay=new Date(year,m,1).getDay();
            const daysInMonth=new Date(year,m+1,0).getDate();
            const cells=[];
            for(let i=0;i<firstDay;i++) cells.push(null);
            for(let d=1;d<=daysInMonth;d++) cells.push(d);
            const monthStr=`${year}-${String(m+1).padStart(2,"0")}`;
            const mSessions=yearSessions.filter(s=>s.date.startsWith(monthStr));
            const trainedDays=new Set(mSessions.map(s=>s.date.slice(0,10))).size;
            const monthVol=mSessions.reduce((a,s)=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return a+v;},0);
            const todayMonth=TODAY.slice(0,7)===monthStr;
            return(
              <div key={m} style={{background:"rgba(255,255,255,0.015)",border:todayMonth?"1px solid rgba(74,222,128,0.2)":`1px solid rgba(255,255,255,0.06)`,borderRadius:10,padding:"8px 8px 6px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:5}}>
                  <span style={{fontWeight:700,fontSize:12,color:todayMonth?"#4ade80":"#f1f5f9"}}>{CAL_MONTHS_SHORT[m]}</span>
                  {trainedDays>0
                    ?<span style={{fontSize:8,color:"#475569"}}>{trainedDays}d{monthVol>0?` · ${monthVol>=1000?(monthVol/1000).toFixed(1)+"k":monthVol}kg`:""}</span>
                    :<span style={{fontSize:8,color:"#475569"}}>—</span>
                  }
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:1,marginBottom:1}}>
                  {["S","M","T","W","T","F","S"].map((d,i)=>(
                    <div key={i} style={{textAlign:"center",fontSize:6,color:"#475569",lineHeight:"12px"}}>{d}</div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
                  {cells.map((d,i)=>{
                    const dStr=d?`${year}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`:null;
                    const intensity=dStr?calIntensity(sbd,dStr,maxV):0;
                    const trained=intensity>0;
                    const isToday=dStr===TODAY;
                    const isSel=dStr===selectedDay;
                    const numColor=dayCellNumColor(isToday,isSel&&trained,trained,intensity);
                    return(
                      <div key={i}
                        onClick={()=>{if(dStr&&trained){if(isSel&&sheetOpen){closeSheet();}else{openSheet(dStr);}}}}
                        style={{aspectRatio:"1",borderRadius:3,
                          background:dStr?(isToday&&!trained?"rgba(74,222,128,0.08)":heatBg(intensity)):"transparent",
                          border:dStr?dayCellBorder(isToday,isSel&&trained,trained):"none",
                          boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center",
                          cursor:trained?"pointer":"default",transition:"all 0.1s",outline:"none",WebkitTapHighlightColor:"transparent"}}>
                        {d&&<span style={{fontSize:7,fontWeight:trained||isToday?700:400,color:numColor,lineHeight:1,userSelect:"none"}}>{d}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{background:"rgba(100,116,139,0.06)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"10px 14px"}}>
        <span style={{color:"#64748b",fontSize:12}}>💡 Tap any trained day to see full workout detail. Today outlined in green.</span>
      </div>

      {/* Backdrop */}
      {sheetOpen&&(
        <div onClick={closeSheet} style={{position:"fixed",inset:0,background:`rgba(0,0,0,${sheetVisible?0.6:0})`,zIndex:40,transition:"background 0.3s"}}/>
      )}

      {/* Bottom sheet */}
      {sheetOpen&&(
        <div style={{
          position:"fixed",left:0,right:0,bottom:0,
          background:"#0d1627",
          borderTop:"1px solid rgba(245,158,11,0.2)",
          borderRadius:"20px 20px 0 0",
          zIndex:50,
          transform:sheetVisible?"translateY(0)":"translateY(100%)",
          transition:"transform 0.32s cubic-bezier(0.32,0.72,0,1)",
          maxHeight:"75vh",
          display:"flex",flexDirection:"column",
          boxShadow:"0 -20px 60px rgba(0,0,0,0.6)",
        }}>
          {/* Drag handle */}
          <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
            <div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.15)"}}/>
          </div>
          {/* Sheet header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 20px 12px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
            <div>
              <div style={{color:"#f59e0b",fontSize:10,fontWeight:700,letterSpacing:1}}>WORKOUT DETAIL</div>
              <div style={{color:"#f1f5f9",fontWeight:700,fontSize:15,marginTop:2}}>
                {selectedDay&&new Date(selectedDay+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
              </div>
            </div>
            <button onClick={closeSheet} style={{background:"rgba(255,255,255,0.06)",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:16,width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",outline:"none",WebkitTapHighlightColor:"transparent"}}>×</button>
          </div>
          {/* Scrollable content */}
          <div style={{overflowY:"auto",padding:"12px 20px 40px",flex:1}}>
            {sheetSessions.map((s,i)=>{
              const sv=(()=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return v;})();
              const isExp=expSession===s.id;
              return(
                <div key={i} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${isExp?"rgba(245,158,11,0.3)":"rgba(255,255,255,0.07)"}`,borderRadius:12,marginBottom:10,overflow:"hidden",transition:"border-color 0.15s"}}>
                  <div onClick={()=>setExpSession(isExp?null:s.id)}
                    style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
                    <div>
                      <div style={{fontWeight:700,color:"#f1f5f9",fontSize:14}}>{s.name}</div>
                      <div style={{color:"#64748b",fontSize:12,marginTop:3}}>{s.exercises?.length||0} exercises{sv>0?` · ${sv.toLocaleString()} kg`:""}</div>
                    </div>
                    <span style={{color:"#475569",fontSize:14,transition:"transform 0.2s",display:"inline-block",transform:isExp?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
                  </div>
                  <div style={{maxHeight:isExp?1000:0,overflow:"hidden",transition:"max-height 0.35s cubic-bezier(0.4,0,0.2,1)"}}>
                    <div style={{padding:"0 16px 16px"}}><SessionDetail session={s}/></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── EXPORT HELPERS ────────────────────────────────────────
function exportJSON(sessions){
  const blob=new Blob([JSON.stringify({exported:new Date().toISOString(),sessions},null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download=`ironlog-backup-${new Date().toISOString().slice(0,10)}.json`; a.click();
}
function exportCSV(sessions){
  const rows=[["date","session_name","program_id","exercise","set_number","weight_kg","reps","rir","rpe"]];
  sessions.forEach(s=>{
    if(!s.exercises?.length){rows.push([s.date.slice(0,10),`"${s.name}"`,s.progId||"","-","-","-","-","-","-"]);return;}
    s.exercises.forEach(ex=>{
      if(!ex.sets?.length){rows.push([s.date.slice(0,10),`"${s.name}"`,s.progId||"",`"${ex.name}"`,"-","-","-","-","-"]);return;}
      ex.sets.filter(st=>st.w||st.r).forEach((st,j)=>{
        rows.push([s.date.slice(0,10),`"${s.name}"`,s.progId||"",`"${ex.name}"`,j+1,st.w||"",st.r||"",st.rir||"",st.rpe||""]);
      });
    });
  });
  const csv=rows.map(r=>r.join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download=`ironlog-sessions-${new Date().toISOString().slice(0,10)}.csv`; a.click();
}

function Nutrition() {
  const [goal, setGoal] = useState("muscle");
  const [weight, setWeight] = useState(80);
  const [unit, setUnit] = useState("kg");

  const wKg = unit === "kg" ? parseFloat(weight)||80 : (parseFloat(weight)||176) * 0.453592;
  const wLb = wKg * 2.20462;

  const phases = {
    muscle: {
      label:"Lean Bulk",icon:"💪",color:"#4ade80",
      surplus:"5–15%",calories:Math.round(wKg*35+300),
      protein:`${(wLb*0.85).toFixed(0)}–${(wLb*1.0).toFixed(0)}g`,
      proteinNote:"0.85–1.0g per lb bodyweight",
      fat:`${Math.round(wKg*35*0.25/9)}–${Math.round(wKg*35*0.30/9)}g`,
      fatNote:"20–30% of total calories",
      timing:"~100–300 kcal surplus above TDEE",
      rate:"0.25–0.5 kg gained per week",
    },
    cut: {
      label:"Cut / Fat Loss",icon:"🔥",color:"#f59e0b",
      surplus:"–15 to –25%",calories:Math.round(wKg*35-500),
      protein:`${(wLb*0.9).toFixed(0)}–${(wLb*1.2).toFixed(0)}g`,
      proteinNote:"0.9–1.2g per lb — higher to preserve muscle",
      fat:`${Math.round(wKg*35*0.20/9)}–${Math.round(wKg*35*0.25/9)}g`,
      fatNote:"20–25% of total calories minimum",
      timing:"~300–500 kcal deficit below TDEE",
      rate:"0.5–1.0 kg lost per week (max)",
    },
    maintain: {
      label:"Maintenance / Recomp",icon:"⚖️",color:"#8b5cf6",
      surplus:"±0–5%",calories:Math.round(wKg*35),
      protein:`${(wLb*0.85).toFixed(0)}–${(wLb*1.0).toFixed(0)}g`,
      proteinNote:"0.85–1.0g per lb bodyweight",
      fat:`${Math.round(wKg*35*0.25/9)}–${Math.round(wKg*35*0.30/9)}g`,
      fatNote:"25–30% of total calories",
      timing:"TDEE ± 100 kcal",
      rate:"Slow recomp — weeks to months",
    },
  };

  const p = phases[goal];
  const proteinG = parseFloat(p.protein.split("–")[0])||0;
  const fatG = parseFloat(p.fat.split("–")[0])||0;
  const carbsG = Math.max(0, Math.round((p.calories - proteinG*4 - fatG*9) / 4));

  const supps = [
    {name:"Creatine Monohydrate",dose:"5g/day",timing:"Anytime, daily",icon:"⚗️",note:"Most evidence-backed supplement. No loading needed."},
    {name:"Caffeine",dose:"150–250mg",timing:"30–60 min pre-workout",icon:"☕",note:"Improves strength, endurance, focus. Avoid after 2pm."},
    {name:"Protein Powder",dose:"As needed",timing:"Anytime to hit daily target",icon:"🥤",note:"Whey, casein, or plant-based. Food first always."},
    {name:"Vitamin D3",dose:"1000–4000 IU/day",timing:"With a meal",icon:"☀️",note:"Most people are deficient. Improves hormones + immune function."},
    {name:"Omega-3 Fish Oil",dose:"1–2g EPA+DHA",timing:"With meals",icon:"🐟",note:"Anti-inflammatory. Supports muscle protein synthesis."},
    {name:"Magnesium",dose:"200–400mg",timing:"Before bed",icon:"🌙",note:"Improves sleep quality. Often depleted in athletes."},
  ];

  const tips = [
    "Eat mostly whole, minimally processed foods — track macros if needed",
    "Prioritize dietary protein at every meal (aim for 30–50g per sitting)",
    "Don't fear carbs — they fuel performance and glycogen replenishment",
    "Fats are essential for hormones — never go below 0.3g per lb bodyweight",
    "Meal timing matters less than total daily intake — eat when works for you",
    "Eating in a slight surplus is required to build meaningful muscle",
    "Tracking body weight daily and averaging weekly reveals true trends",
    "Adjust calories by 10% if weight isn't trending right after 2 weeks",
  ];

  return (
    <div style={S.pg}>
      <div style={S.pgH}>
        <h1 style={S.pgT}>🥗 Nutrition</h1>
        <p style={S.pgS}>Based on Jeff Nippard — Pure Bodybuilding Nutrition Booklet</p>
      </div>
      <div style={S.card}>
        <h2 style={S.cT}>Your Goal</h2>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
          {Object.entries(phases).map(([k,v])=>(
            <button key={k} onClick={()=>setGoal(k)}
              style={{...S.chip,...(goal===k?{...S.chipA,borderColor:v.color,color:v.color,background:v.color+"18"}:{}),padding:"10px 16px"}}>
              {v.icon} {v.label}
            </button>
          ))}
        </div>
        <div style={{marginTop:16,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <div>
            <div style={S.lbl}>Bodyweight</div>
            <div style={{display:"flex",gap:6,marginTop:6,alignItems:"center"}}>
              <input type="number" value={weight} onChange={e=>setWeight(e.target.value)}
                style={{...S.sinp,width:70}} />
              <button onClick={()=>setUnit(u=>u==="kg"?"lb":"kg")}
                style={{...S.chip,padding:"7px 14px"}}>{unit}</button>
            </div>
          </div>
          <div style={{color:"#64748b",fontSize:12,marginTop:20}}>
            {wKg.toFixed(1)} kg / {wLb.toFixed(1)} lb
          </div>
        </div>
      </div>

      <div style={{...S.card,borderColor:p.color+"40"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{fontSize:28}}>{p.icon}</span>
          <div>
            <h2 style={{...S.cT,color:p.color}}>{p.label} Targets</h2>
            <div style={{color:"#64748b",fontSize:13}}>{p.timing}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:14}}>
          {[
            {label:"Daily Calories",value:`~${p.calories.toLocaleString()}`,unit:"kcal",color:p.color},
            {label:"Caloric Offset",value:p.surplus,unit:"vs TDEE",color:"#94a3b8"},
            {label:"Protein",value:p.protein,unit:"/ day",color:"#4ade80"},
            {label:"Fat",value:p.fat,unit:"/ day",color:"#f59e0b"},
          ].map((m,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${m.color}30`,borderRadius:10,padding:"12px 14px"}}>
              <div style={{color:"#64748b",fontSize:11,marginBottom:4}}>{m.label}</div>
              <div style={{color:m.color,fontWeight:800,fontSize:18}}>{m.value}</div>
              <div style={{color:"#475569",fontSize:11}}>{m.unit}</div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={S.lbl}>Macro Breakdown</span>
            <span style={{color:"#475569",fontSize:11}}>{p.calories} kcal</span>
          </div>
          {[
            {name:"Protein",g:proteinG,color:"#4ade80",pct:Math.round(proteinG*4/p.calories*100)},
            {name:"Fat",g:fatG,color:"#f59e0b",pct:Math.round(fatG*9/p.calories*100)},
            {name:"Carbs",g:carbsG,color:"#06b6d4",pct:Math.round(carbsG*4/p.calories*100)},
          ].map((m,i)=>(
            <div key={i} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{color:"#94a3b8",fontSize:12}}>{m.name}</span>
                <span style={{color:m.color,fontSize:12,fontWeight:600}}>~{Math.round(m.g)}g ({m.pct}%)</span>
              </div>
              <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2}}>
                <div style={{height:"100%",width:`${Math.min(m.pct,100)}%`,background:m.color,borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,padding:10,background:"rgba(255,255,255,0.02)",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{color:"#64748b",fontSize:11,lineHeight:1.8}}>
            <div>📌 <strong style={{color:"#94a3b8"}}>Protein:</strong> {p.proteinNote}</div>
            <div>📌 <strong style={{color:"#94a3b8"}}>Fat:</strong> {p.fatNote}</div>
            <div>📌 <strong style={{color:"#94a3b8"}}>Rate:</strong> {p.rate}</div>
          </div>
        </div>
      </div>

      <div style={S.card}>
        <h2 style={{...S.cT,marginBottom:4}}>Supplements</h2>
        <p style={{color:"#64748b",fontSize:13,marginBottom:14}}>Evidence-based only. Food first, always.</p>
        {supps.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderTop:"1px solid rgba(255,255,255,0.05)",alignItems:"flex-start"}}>
            <span style={{fontSize:22,lineHeight:1.2}}>{s.icon}</span>
            <div style={{flex:1}}>
              <div style={{color:"#e2e8f0",fontWeight:600,fontSize:14}}>{s.name}</div>
              <div style={{display:"flex",gap:12,marginTop:3}}>
                <span style={{color:"#f59e0b",fontSize:12,fontWeight:600}}>{s.dose}</span>
                <span style={{color:"#64748b",fontSize:12}}>· {s.timing}</span>
              </div>
              <div style={{color:"#475569",fontSize:12,marginTop:4,fontStyle:"italic"}}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <h2 style={{...S.cT,marginBottom:14}}>📖 Nippard's Key Principles</h2>
        {tips.map((t,i)=>(
          <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
            <span style={{color:"#f59e0b",fontWeight:700,minWidth:20,fontSize:12,paddingTop:1}}>{i+1}.</span>
            <span style={{color:"#94a3b8",fontSize:13,lineHeight:1.6}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── QR CODE (pure JS, no library) ────────────────────────
// Lightweight QR via free CDN — loaded lazily
function QRModal({data, onClose}){
  const canvasRef=useRef(null);
  const [err,setErr]=useState(null);
  useEffect(()=>{
    if(!canvasRef.current) return;
    // Use qrcode library from CDN
    const script=document.createElement("script");
    script.src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.onload=()=>{
      try{
        canvasRef.current.innerHTML="";
        new window.QRCode(canvasRef.current,{
          text:data, width:256, height:256,
          colorDark:"#000000", colorLight:"#ffffff",
          correctLevel:window.QRCode.CorrectLevel.M
        });
      }catch(e){ setErr("Data too large for QR. Use file export instead."); }
    };
    script.onerror=()=>setErr("Could not load QR library. Check your connection.");
    document.head.appendChild(script);
    return()=>{ try{document.head.removeChild(script);}catch{} };
  },[data]);
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1627",border:"1px solid rgba(245,158,11,0.3)",borderRadius:20,padding:"28px 24px",textAlign:"center",maxWidth:320,width:"90%"}}>
        <div style={{color:"#f59e0b",fontWeight:700,fontSize:14,marginBottom:4}}>📱 QR Export</div>
        <div style={{color:"#64748b",fontSize:12,marginBottom:16}}>Last 30 days · Scan to import on another device</div>
        {err
          ?<div style={{color:"#ef4444",fontSize:13,padding:"20px 0"}}>{err}</div>
          :<div ref={canvasRef} style={{background:"#fff",padding:12,borderRadius:10,display:"inline-block",minWidth:256,minHeight:256}}/>
        }
        <div style={{marginTop:16}}>
          <button onClick={onClose} style={{...S.bs,width:"100%"}}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── HISTORY ──────────────────────────────────────────────
function History({sessions,softDelete,deletedSessions,restoreSession,permanentDelete,importSessions,onEdit}){
  const [mode,setMode]=useState("list");
  const [calView,setCalView]=useState("month");
  const [exp,setExp]=useState(null);
  const [flt,setFlt]=useState("all");
  const [currentDate,setCurrentDate]=useState(new Date());
  const [selectedDay,setSelectedDay]=useState(calToday());
  const [showDeleted,setShowDeleted]=useState(false);
  const [confirmPerm,setConfirmPerm]=useState(null);
  const [showQR,setShowQR]=useState(false);
  const importRef=useRef(null);

  const sbd=calSessionsByDate(sessions);
  const maxV=calMaxVol(sessions);
  const filtered=sessions.filter(s=>flt==="all"||(flt==="program"&&s.progId)||(flt==="free"&&!s.progId));
  const vol=(s)=>{let v=0;s.exercises?.forEach(ex=>ex.sets?.forEach(set=>{v+=(parseFloat(set.w)||0)*(parseFloat(set.r)||0);}));return v;};

  const qrSessions=sessions.filter(s=>(Date.now()-new Date(s.date))/86400000<=30);
  const qrData=JSON.stringify({exported:new Date().toISOString(),sessions:qrSessions});

  const handleImport=(e)=>{
    const file=e.target.files?.[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      try{
        const json=JSON.parse(ev.target.result);
        const incoming=json.sessions||json;
        if(Array.isArray(incoming)) importSessions(incoming);
      }catch{ alert("Invalid backup file — expected JSON"); }
    };
    reader.readAsText(file);
    e.target.value="";
  };

  return(
    <div style={S.pg}>
      <div style={S.pgH}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><h1 style={S.pgT}>History</h1><p style={S.pgS}>{sessions.length} sessions logged</p></div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end",marginTop:2}}>
            {sessions.length>0&&<>
              <button onClick={()=>exportJSON(sessions)} style={{background:"rgba(139,92,246,0.12)",border:"1px solid rgba(139,92,246,0.3)",color:"#a78bfa",borderRadius:8,padding:"7px 10px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>⬇ JSON</button>
              <button onClick={()=>exportCSV(sessions)} style={{background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.3)",color:"#4ade80",borderRadius:8,padding:"7px 10px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>⬇ CSV</button>
              <button onClick={()=>setShowQR(true)} style={{background:"rgba(6,182,212,0.1)",border:"1px solid rgba(6,182,212,0.3)",color:"#06b6d4",borderRadius:8,padding:"7px 10px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>⬡ QR</button>
            </>}
            <button onClick={()=>importRef.current?.click()} style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.3)",color:"#f59e0b",borderRadius:8,padding:"7px 10px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>⬆ Import</button>
            <input ref={importRef} type="file" accept=".json" onChange={handleImport} style={{display:"none"}}/>
          </div>
        </div>
      </div>

      {sessions.length===0?(
        <div style={{...S.card,textAlign:"center",padding:"48px 24px"}}>
          <div style={{fontSize:48,marginBottom:16}}>📊</div>
          <div style={{color:"#f1f5f9",fontWeight:600,marginBottom:8}}>No sessions yet</div>
          <div style={{color:"#64748b",fontSize:14}}>Log your first workout to see it here</div>
        </div>
      ):(
        <>
          <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:10,padding:3,marginBottom:14,border:"1px solid rgba(255,255,255,0.07)"}}>
            {[{id:"list",l:"📋 List"},{id:"calendar",l:"📅 Calendar"}].map(m=>(
              <button key={m.id} onClick={()=>setMode(m.id)} style={{flex:1,background:mode===m.id?"#f59e0b":"transparent",color:mode===m.id?"#000":"#64748b",border:"none",borderRadius:8,padding:"8px 0",fontFamily:"inherit",fontWeight:700,fontSize:13,cursor:"pointer",transition:"all 0.15s"}}>{m.l}</button>
            ))}
          </div>

          {mode==="list"&&(
            <>
              <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                {[{id:"all",l:"All"},{id:"program",l:"Program"},{id:"free",l:"Free"}].map(f=>(
                  <button key={f.id} onClick={()=>setFlt(f.id)} style={{...S.chip,...(flt===f.id?S.chipA:{})}}>{f.l}</button>
                ))}
              </div>
              {filtered.map(s=>{
                const sv=vol(s); const isExp=exp===s.id;
                return(
                  <div key={s.id} style={{...S.card,padding:0,overflow:"hidden",border:`1px solid ${isExp?"rgba(245,158,11,0.25)":"rgba(255,255,255,0.06)"}`,transition:"border-color 0.15s"}}>
                    <div onClick={()=>setExp(isExp?null:s.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 16px",cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{color:"#f1f5f9",fontWeight:700,fontSize:15}}>{s.name}</div>
                        <div style={{color:"#64748b",fontSize:12,marginTop:4}}>
                          {new Date(s.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})}
                          {" · "}{s.exercises?.length||0} exercises{sv>0&&` · ${sv.toLocaleString()} kg`}
                        </div>
                        {s.sessionNotes&&<div style={{color:"#475569",fontSize:11,marginTop:4,fontStyle:"italic",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.sessionNotes}</div>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:10,flexShrink:0}}>
                        <span style={{color:"#475569",fontSize:12,transform:isExp?"rotate(180deg)":"none",display:"inline-block",transition:"transform 0.2s"}}>▼</span>
                        <button onClick={e=>{e.stopPropagation();onEdit(s);}} title="Edit session"
                          style={{background:"transparent",border:"1px solid rgba(100,116,139,0.3)",color:"#64748b",borderRadius:6,padding:"5px 8px",cursor:"pointer",fontSize:12,outline:"none",WebkitTapHighlightColor:"transparent"}}>✏️</button>
                        <button onClick={e=>{e.stopPropagation();softDelete(s.id);}}
                          style={{background:"transparent",border:"1px solid rgba(239,68,68,0.3)",color:"rgba(239,68,68,0.6)",borderRadius:6,padding:"5px 9px",cursor:"pointer",fontSize:13,outline:"none",WebkitTapHighlightColor:"transparent"}}>×</button>
                      </div>
                    </div>
                    <div style={{maxHeight:isExp?2000:0,overflow:"hidden",transition:"max-height 0.35s cubic-bezier(0.4,0,0.2,1)"}}>
                      <div style={{padding:"0 16px 16px",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                        {s.sessionNotes&&<div style={{color:"#94a3b8",fontSize:12,fontStyle:"italic",paddingTop:10,paddingBottom:4,lineHeight:1.5}}>{s.sessionNotes}</div>}
                        <SessionDetail session={s}/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {mode==="calendar"&&(
            <>
              <div style={{display:"flex",background:"rgba(255,255,255,0.03)",borderRadius:8,padding:2,marginBottom:12,gap:2}}>
                {["day","week","month","year"].map(v=>(
                  <button key={v} onClick={()=>setCalView(v)} style={{flex:1,background:calView===v?"#f59e0b":"transparent",color:calView===v?"#000":"#64748b",border:"none",borderRadius:6,padding:"6px 0",fontFamily:"inherit",fontWeight:700,fontSize:11,cursor:"pointer",textTransform:"uppercase",letterSpacing:0.4,transition:"all 0.15s"}}>{v}</button>
                ))}
              </div>
              {calView==="day"   &&<CalDayView   selectedDay={selectedDay} setSelectedDay={setSelectedDay} sbd={sbd}/>}
              {calView==="week"  &&<CalWeekView  currentDate={currentDate} setCurrentDate={setCurrentDate} selectedDay={selectedDay} setSelectedDay={setSelectedDay} sbd={sbd} maxV={maxV}/>}
              {calView==="month" &&<CalMonthView currentDate={currentDate} setCurrentDate={setCurrentDate} selectedDay={selectedDay} setSelectedDay={setSelectedDay} sbd={sbd} maxV={maxV}/>}
              {calView==="year"  &&<CalYearView  currentDate={currentDate} setCurrentDate={setCurrentDate} selectedDay={selectedDay} setSelectedDay={setSelectedDay} sbd={sbd} maxV={maxV} sessions={sessions}/>}
            </>
          )}
        </>
      )}

      {/* ── DELETED SESSIONS ──────────────────────────────── */}
      {deletedSessions.length>0&&(
        <div style={{marginTop:20}}>
          <button onClick={()=>setShowDeleted(v=>!v)}
            style={{display:"flex",alignItems:"center",gap:8,background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:10,padding:"11px 14px",cursor:"pointer",width:"100%",color:"#94a3b8",fontSize:13,fontWeight:600,fontFamily:"inherit",WebkitTapHighlightColor:"transparent",boxSizing:"border-box"}}>
            <span style={{color:"#ef4444"}}>🗑</span>
            <span>Deleted Sessions</span>
            <span style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#ef4444",borderRadius:10,padding:"1px 8px",fontSize:11,fontWeight:700}}>{deletedSessions.length}</span>
            <span style={{marginLeft:"auto",fontSize:11,color:"#475569"}}>30-day hold {showDeleted?"▲":"▼"}</span>
          </button>

          {showDeleted&&(
            <div style={{marginTop:8}}>
              <div style={{color:"#475569",fontSize:11,marginBottom:8,paddingLeft:2}}>Sessions here are kept for 30 days before being permanently deleted. You can restore them to History or delete forever.</div>
              {deletedSessions.map(s=>{
                const daysLeft=Math.max(0,30-Math.round((Date.now()-new Date(s.deletedAt).getTime())/86400000));
                const isPerm=confirmPerm===s.id;
                const sv=vol(s);
                return(
                  <div key={s.id} style={{background:"rgba(239,68,68,0.03)",border:"1px solid rgba(239,68,68,0.1)",borderRadius:10,padding:"12px 14px",marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                      <div>
                        <div style={{color:"#cbd5e1",fontWeight:600,fontSize:13}}>{s.name}</div>
                        <div style={{color:"#64748b",fontSize:11,marginTop:3}}>
                          {new Date(s.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})}
                          {" · "}{s.exercises?.length||0} exercises{sv>0&&` · ${sv.toLocaleString()} kg`}
                        </div>
                        <div style={{color:daysLeft<=3?"#ef4444":"#64748b",fontSize:10,marginTop:4,fontWeight:daysLeft<=3?700:400}}>
                          {daysLeft===0?"Deletes today":daysLeft===1?"Deletes tomorrow":`${daysLeft} days until permanent deletion`}
                        </div>
                      </div>
                    </div>
                    {!isPerm?(
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>restoreSession(s.id)} style={{...S.bs,flex:1,padding:"7px 0",fontSize:12}}>↩ Restore</button>
                        <button onClick={()=>setConfirmPerm(s.id)} style={{background:"transparent",border:"1px solid rgba(239,68,68,0.35)",color:"#ef4444",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit",opacity:0.8}}>Delete Forever</button>
                      </div>
                    ):(
                      <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:8,padding:"10px 12px"}}>
                        <div style={{color:"#ef4444",fontSize:12,fontWeight:600,marginBottom:8}}>Permanently delete this session? This cannot be undone.</div>
                        <div style={{display:"flex",gap:8}}>
                          <button onClick={()=>{permanentDelete(s.id);setConfirmPerm(null);}} style={{background:"rgba(239,68,68,0.2)",border:"1px solid rgba(239,68,68,0.5)",color:"#ef4444",borderRadius:6,padding:"6px 18px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>Yes, delete forever</button>
                          <button onClick={()=>setConfirmPerm(null)} style={{...S.bs,padding:"6px 14px",fontSize:12}}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── QR MODAL ──────────────────────────────────────── */}
      {showQR&&<QRModal data={qrData} onClose={()=>setShowQR(false)}/>}
    </div>
  );
}
