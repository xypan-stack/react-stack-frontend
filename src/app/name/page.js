'use client'
import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
export default function NamePage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
 
  const handleSubmit = async () => {
    if (!name.trim()) {
      setMessage('请输入名字');
      setSeverity('error');
      setOpen(true);
      return;
    }
 
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8002/api/names', {"name": name});
 
      // axios 返回的响应对象没有 ok 属性，需要检查 status
      if (response.status >= 200 && response.status < 300) {
        setMessage('名字添加成功');
        setSeverity('success');
        setName('');  // 清空输入框
      } else {
        setMessage(`添加失败: ${response.data.detail || '未知错误'}`);
        setSeverity('error');
      }
    } catch (error) {
      setMessage(`请求错误: ${error.response?.data?.detail || error.message}`);
      setSeverity('error');
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };
 
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        添加名字
      </Typography>
      
      <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
        <TextField
          fullWidth
          label="输入名字"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? '添加中...' : '添加名字'}
        </Button>
      </Box>
 
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
 