import React, { useState, useMemo } from "react";
import {
  TextField,
  Autocomplete,
  Menu,
  MenuItem,
  Modal,
  Box,
  Typography,
  Select,
  MenuItem as SelectItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function FrequencyPage({ frequencyData }) {
  const [selectedEmcode, setSelectedEmcode] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [updatedOneDay, setUpdatedOneDay] = useState(null);
  const [updatedOneWeek, setUpdatedOneWeek] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const emcodeOptions = useMemo(() => {
    return [...new Set(frequencyData.map((item) => item.emcode))];
  }, [frequencyData]);

  const platformOptions = useMemo(() => {
    return [...new Set(frequencyData.map((item) => item.platform))];
  }, [fr
