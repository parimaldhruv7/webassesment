import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#f9f9f9',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  maxWidth: 800,
  margin: 'auto',
}));

const WebDevProject = () => {
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    productionPerDay: 5,
    majorFabric: 'None',
    fabrics: [{
      name: '',
      perPieceRequirement: '',
      unit: 'M',
      colors: [{ color: '', quantity: '' }],
      processes: [],
      stagesSkipped: []
    }],
    chinaFabric: false,
    chinaFabrics: [],
    trims: [],
    accessories: []
  });

  const fabricOptions = ['Cotton', 'Linen', 'Silk', 'Polyester', 'Wool'];
  const processOptions = ['Dying', 'Mock Up', 'Cutting', 'Sewing', 'Finishing'];
  const trimOptions = ['Buttons', 'Zippers', 'Lace', 'Ribbons'];
  const accessoryOptions = ['Pockets', 'Patches', 'Embroidery', 'Beads'];

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFabricChange = (index, field, value) => {
    const updatedFabrics = [...formData.fabrics];
    updatedFabrics[index][field] = value;
    handleChange('fabrics', updatedFabrics);
  };

  const handleColorQuantityChange = (fabricIndex, colorIndex, field, value) => {
    const updatedFabrics = [...formData.fabrics];
    updatedFabrics[fabricIndex].colors[colorIndex][field] = value;
    handleChange('fabrics', updatedFabrics);
  };

  const addFabric = () => {
    handleChange('fabrics', [
      ...formData.fabrics,
      {
        name: '',
        perPieceRequirement: '',
        unit: 'M',
        colors: [{ color: '', quantity: '' }],
        processes: [],
        stagesSkipped: []
      }
    ]);
  };

  const addColorQuantity = (fabricIndex) => {
    const updatedFabrics = [...formData.fabrics];
    updatedFabrics[fabricIndex].colors.push({ color: '', quantity: '' });
    handleChange('fabrics', updatedFabrics);
  };

  const handleSubmit = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData);
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Web Development Project Form
      </Typography>

      <Stack spacing={3} width="100%">
       
        <TextField
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

       
        <TextField
          label="Production Per Day Per Machine"
          type="number"
          value={formData.productionPerDay}
          onChange={(e) => handleChange('productionPerDay', e.target.value)}
          fullWidth
        />

       
        {formData.fabrics.map((fabric, index) => (
          <Box key={index} p={2} mb={3} border={1} borderRadius={2}>
            <Typography variant="h6">Fabric {index + 1}</Typography>

           
            <FormControl fullWidth margin="normal">
              <InputLabel>Fabric Name</InputLabel>
              <Select
                value={fabric.name}
                onChange={(e) => handleFabricChange(index, 'name', e.target.value)}
              >
                {fabricOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          
            <TextField
              label="Per Piece Requirement"
              type="number"
              fullWidth
              margin="normal"
              value={fabric.perPieceRequirement}
              onChange={(e) => handleFabricChange(index, 'perPieceRequirement', e.target.value)}
            />

            {/* Unit */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Unit</InputLabel>
              <Select
                value={fabric.unit}
                onChange={(e) => handleFabricChange(index, 'unit', e.target.value)}
              >
                <MenuItem value="M">Meter</MenuItem>
                <MenuItem value="Kg">Kilogram</MenuItem>
              </Select>
            </FormControl>

           
            <Typography variant="subtitle1" mt={2}>Colors and Quantities</Typography>
            {fabric.colors.map((colorQuantity, colorIndex) => (
              <Stack direction="row" spacing={2} key={colorIndex} mt={1}>
                <TextField
                  label="Color"
                  value={colorQuantity.color}
                  onChange={(e) =>
                    handleColorQuantityChange(index, colorIndex, 'color', e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Quantity"
                  type="number"
                  value={colorQuantity.quantity}
                  onChange={(e) =>
                    handleColorQuantityChange(index, colorIndex, 'quantity', e.target.value)
                  }
                  fullWidth
                />
              </Stack>
            ))}
            <Button
              variant="outlined"
              onClick={() => addColorQuantity(index)}
              sx={{ mt: 2 }}
            >
              Add More Colors & Quantities
            </Button>

            {/* Processes */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Processes</InputLabel>
              <Select
                multiple
                value={fabric.processes}
                onChange={(e) => handleFabricChange(index, 'processes', e.target.value)}
              >
                {processOptions.map((process) => (
                  <MenuItem key={process} value={process}>
                    {process}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

   
            <FormControl fullWidth margin="normal">
              <InputLabel>Stages to be Skipped</InputLabel>
              <Select
                multiple
                value={fabric.stagesSkipped}
                onChange={(e) => handleFabricChange(index, 'stagesSkipped', e.target.value)}
              >
                {processOptions.map((stage) => (
                  <MenuItem key={stage} value={stage}>
                    {stage}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}

       
        <Button variant="contained" color="primary" onClick={addFabric}>
          Add More Fabric
        </Button>

       
        <Box mt={4}>
          <Typography variant="subtitle1">Is China Fabric Present?</Typography>
          <Button
            variant={formData.chinaFabric ? 'contained' : 'outlined'}
            onClick={() => handleChange('chinaFabric', true)}
            color={formData.chinaFabric ? 'primary' : 'default'}
          >
            Yes
          </Button>
          <Button
            variant={!formData.chinaFabric ? 'contained' : 'outlined'}
            onClick={() => handleChange('chinaFabric', false)}
            color={!formData.chinaFabric ? 'primary' : 'default'}
            sx={{marginLeft:'2rem'}}
          >
            No
          </Button>
          {formData.chinaFabric && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Select China Fabric</InputLabel>
              <Select
                multiple
                value={formData.chinaFabrics}
                onChange={(e) => handleChange('chinaFabrics', e.target.value)}
              >
                {formData.fabrics
                  .filter(fabric => fabric.name)
                  .map((fabric, index) => (
                    <MenuItem key={index} value={fabric.name}>
                      {fabric.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Box>

       
        <FormControl fullWidth margin="normal">
          <InputLabel>Choose Major Fabric</InputLabel>
          <Select
            value={formData.majorFabric}
            onChange={(e) => handleChange('majorFabric', e.target.value)}
          >
            <MenuItem value="None">None</MenuItem>
            {formData.fabrics
              .filter(fabric => fabric.name)
              .map((fabric, index) => (
                <MenuItem key={index} value={fabric.name}>
                  {fabric.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 4 }}>
        Submit
      </Button>
    </StyledContainer>
  );
};

export default WebDevProject;
