import {
  InputBase,
  Paper,
  Typography,
  Container,
  Box,
  IconButton
} from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const Title = ({ initialTitle = 'Todo başlık', onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [tempTitle, setTempTitle] = useState(title);
  
  const handleInputChange = (e) => {
      setTempTitle(e.target.value);
  };

  const handleSave = () => {
      // Boş başlık kontrolü
      const newTitle = tempTitle.trim() || initialTitle;
      setTitle(newTitle);
      setTempTitle(newTitle);
      setIsEditing(false);
      
      // Eğer onTitleChange prop'u varsa değişikliği bildir
      if (onTitleChange) {
          onTitleChange(newTitle);
      }
  };

  const handleCancel = () => {
      setTempTitle(title);
      setIsEditing(false);
  };

  const sharedStyles = {
      width: '100%',
      textAlign: "center",
      borderRadius: 1,
      px: 1,
      fontSize: "1.5rem", 
  };

  return (
      <Container
          maxWidth="sm"
          sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
          }}
      >
          <Box
              sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
              }}
          >
              {isEditing ? (
                  <>
                      <InputBase
                          sx={{
                              ...sharedStyles,
                              fontWeight: 400, 
                              border: "1px solid #ccc",
                              flexGrow: 1,
                          }}
                          placeholder="Liste başlığı"
                          value={tempTitle}
                          fullWidth
                          onChange={handleInputChange}
                          autoFocus
                      />
                      <IconButton 
                          color="primary" 
                          onClick={handleSave}
                      >
                          <CheckIcon />
                      </IconButton>
                  </>
              ) : (
                  <>
                      <Typography
                          variant="h4"
                          sx={{
                              ...sharedStyles,
                              fontWeight: "bold",
                          }}
                      >
                          {title}
                      </Typography>
                      <IconButton 
                          color="primary" 
                          onClick={() => setIsEditing(true)}
                      >
                          <EditIcon />
                      </IconButton>
                  </>
              )}
          </Box>
      </Container>
  );
};

export default Title;