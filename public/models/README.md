
# 3D Avatar Model

To use a realistic 3D avatar, place your avatar model file here as `avatar.glb`.

## Requirements

- The file must be named exactly `avatar.glb`
- The model should be a humanoid figure in T-pose or A-pose
- For best results, use a model with basic PBR materials
- The model origin should be at the feet level
- The model's forward direction should be along the Z-axis

## Where to find models

You can find suitable 3D human models from these sources:

1. [CGTrader](https://www.cgtrader.com/free-3d-models/character/anatomy/free-base-mesh-human-male-female)
2. [Sketchfab](https://sketchfab.com/search?q=human+base+mesh&type=models)
3. [Mixamo](https://www.mixamo.com/) - Download a character in T-pose

## Troubleshooting

If your model doesn't appear:
- Ensure the file is named exactly `avatar.glb`
- Check that the model isn't too large (under 10MB recommended)
- Verify that the model is correctly exported in glTF/GLB format

If no GLB model is found, the application will automatically fall back to using the primitive-based avatar.
