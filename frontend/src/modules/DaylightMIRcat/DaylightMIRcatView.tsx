import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  FlashOn as LaserIcon,
  Construction as ConstructionIcon,
} from '@mui/icons-material';

/**
 * Daylight MIRcat Laser Control Panel
 * Placeholder component for Phase 1C development
 */
const DaylightMIRcatView: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <LaserIcon sx={{ fontSize: 48, color: 'warning.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Daylight MIRcat Laser
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tunable Mid-IR Probe Source
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Chip
            label="Phase 1C"
            color="warning"
            variant="outlined"
            icon={<ConstructionIcon />}
          />
        </Box>
      </Box>

      {/* Placeholder Content */}
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <ConstructionIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Control Panel Under Development
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            This device control panel will be implemented in Phase 1C of the project.
            The Daylight MIRcat laser provides tunable mid-infrared radiation for
            pump-probe spectroscopy experiments.
          </Typography>
          
          <Box sx={{ mt: 4, p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Planned Features:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              • Wavelength tuning and control (2.2-11.8 μm)<br/>
              • Power output adjustment and monitoring<br/>
              • Temperature and system status monitoring<br/>
              • Laser arming/disarming controls<br/>
              • Wavelength scanning and automation<br/>
              • Integration with experiment protocols
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DaylightMIRcatView;

