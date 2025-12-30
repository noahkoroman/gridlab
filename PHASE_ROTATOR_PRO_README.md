# Gridlab Phase Rotator Pro

An enhanced Max for Live phase rotator device with dual oscilloscope visualization and two-track comparison capability.

## New Features

### 1. **Dual Oscilloscope Display**
- **Track 1 Oscilloscope** (Green) - Real-time waveform visualization of your main track signal
- **Track 2 Oscilloscope** (Blue) - Real-time waveform visualization of comparison track
- High-resolution display with 32 calculation points for accurate waveform representation
- Range: -1.0 to 1.0 (standard audio range)

### 2. **Dual Track Input with Dynamic Track Selector**
- Main track input via plugin~ (standard Max for Live audio routing)
- **Dynamic Track Dropdown**: Automatically populates with all tracks from your Live set
- **One-Click Selection**: Choose any track by name from the dropdown menu
- **Live.tap~ Integration**: Direct audio routing from any track in your project
- Track 2 Mix control (0-100%) to blend comparison signal
- Perfect for A/B comparison and phase relationship analysis between different tracks

### 3. **Enhanced Phase Rotation**
- **Rotation Type Selection:**
  - **Allpass**: Classic allpass filter cascade (3.7, 2.5, 5.1 seconds for L channel; 0.8, 3.2, 5.1 for R)
  - **Hilbert**: Hilbert transform for 90° phase shift
- **Rotate Control**: -100% to +100% with smooth interpolation
- Exponential curve (pow 0.4) for musical response
- 20ms ramp time for click-free parameter changes

## How to Use

### Basic Setup
1. Open the `.maxpat` file in Max/MSP or save as `.amxd` for use in Ableton Live
2. Place the device on an audio track
3. Adjust the **Rotate** dial to shift phase (-100% to +100%)
4. Choose rotation type: **Allpass** for subtle stereo widening, **Hilbert** for dramatic effects

### Two-Track Comparison Mode
1. **Select the track for Oscilloscope 2:**
   - Open the **Track Selector dropdown** (below Oscilloscope 2)
   - The dropdown automatically populates with all tracks in your Live set
   - Click to select any track by name
   - The device uses `live.tap~` to route audio directly from the selected track
2. **Adjust Track 2 Mix** to blend the comparison signal (0% = off, 100% = full mix)
3. **Monitor both oscilloscopes** to visualize phase relationships in real-time:
   - **Green scope (left)**: Shows your main track signal (where the device is placed)
   - **Blue scope (right)**: Shows the selected track's signal from the dropdown

### Oscilloscope Interpretation
- **In-phase signals**: Waveforms move together
- **Out-of-phase signals**: Waveforms move in opposite directions
- **90° phase shift**: One waveform appears to lead/lag by 1/4 cycle
- **Phase cancellation**: Waveforms cancel when summed (thin or flat display)

## Technical Details

### Signal Path
```
Input → selector~ → [Allpass Cascade OR Hilbert Transform] → Output + Scope
```

### Allpass Filter Stages
- **Left Channel**: 3.7s, 2.5s, 5.1s delay (12 samples each)
- **Right Channel**: 0.8s, 2.5s, 5.1s delay (12 samples each)
- Different delay times create stereo width

### Rotation Control Mapping
```
User Input (-100 to 100)
  → pow(x, 0.4) [exponential curve]
  → scale 0-1 to 0.1-0.9 [usable range]
  → line 20ms [smoothing]
  → allpass~ delay parameter
```

## UI Layout (Presentation Mode)

```
┌──────────────────────────────────────────────────────────┐
│  [Rotate]  [Trk2 Mix]  ┌──────────┐  ┌──────────┐       │
│    Dial       Dial      │ Track 1  │  │ Track 2  │       │
│                         │  Scope   │  │  Scope   │       │
│  [Rotation Type ▼]      │ (Green)  │  │  (Blue)  │       │
│   Allpass/Hilbert       └──────────┘  └──────────┘       │
│                         Track 1         Track 2           │
│                         (Main)         (Compare)          │
│                                                            │
│                                      Select Track for     │
│                                      Oscilloscope 2:      │
│                                      ┌─────────────────┐  │
│                                      │ 1-Audio       ▼ │  │
│                                      │ 2-Bass          │  │
│                                      │ 3-Drums         │  │
│                                      └─────────────────┘  │
│  Phase Rotator Pro - Dual Oscilloscope with Track Select │
└──────────────────────────────────────────────────────────┘
```

## Creative Applications

1. **Stereo Width Enhancement**: Subtle rotation (10-30%) with Allpass mode
2. **Phase Correction**: Compare tracks to identify and fix phase issues using the track selector
3. **A/B Mix Comparison**: Drag different mix versions into Oscilloscope 2 to compare phase relationships
4. **Stem Analysis**: Monitor individual stems against the main mix to check phase coherence
5. **Special Effects**: Extreme rotation (70-100%) with Hilbert for dramatic stereo movement
6. **Mastering**: Fine-tune stereo image with visual feedback from dual oscilloscopes
7. **Live Performance**: Switch between different tracks in Oscilloscope 2 to monitor phase during transitions

## Saving as .amxd (Ableton Live)

1. Open `Gridlab Phase Rotator Pro.maxpat` in Max for Live
2. Click "Edit" to enter edit mode
3. Save the device: File → Save As → Choose `.amxd` format
4. Place in Ableton's User Library or project folder
5. Drag onto an audio track in Live

## Requirements

- Max 8.5.6 or later
- Ableton Live 11+ (for .amxd usage)
- Audio interface with sufficient inputs for dual-track mode

## Troubleshooting

**No sound output:**
- Check plugin~ object is receiving audio
- Verify rotation amount isn't at extreme that causes silence
- Ensure track is not muted

**Oscilloscopes not displaying:**
- Verify audio is passing through the device
- Check scope~ range settings (-1.0 to 1.0)
- Ensure calccount is set (default: 32)

**Track 2 oscilloscope not displaying:**
- Open the track selector dropdown (below Oscilloscope 2)
- Verify tracks are listed in the dropdown - if not, reload the device or restart Live
- Select a track from the dropdown that has audio playing
- Ensure the selected track is not muted or frozen in Live
- Check that the selected track has actual audio output (not just MIDI)
- Try selecting a different track to verify the tap is working

**Dropdown not showing tracks:**
- The dropdown populates on device load - if empty, try reloading the device
- Ensure you're using this as a Max for Live device in Ableton Live (not standalone Max)
- Check that `live.thisdevice` is properly connected (visible in unlocked patch view)
- Try opening and closing the patch in edit mode to trigger a refresh

## Credits

Enhanced version of the original Gridlab phase rotator with dual oscilloscope visualization and comparative analysis features.

---

**Version**: 1.0
**Date**: December 2025
**Compatibility**: Max 8+, Ableton Live 11+
