"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Mantra {
  title: string;
  sanskrit: string;
  translation: string;
  benefits: string;
}

interface Video {
  title: string;
  url: string;
  description: string;
}

export default function AdminPage() {
  const [mantras, setMantras] = useState<Mantra[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  // User management and site settings state
  const [users, setUsers] = useState([
    { id: 1, username: "admin", role: "Super Admin" },
    { id: 2, username: "editor", role: "Editor" },
  ]);
  const [newUser, setNewUser] = useState({ username: "", role: "Editor", password: "" });
  const [siteSettings, setSiteSettings] = useState({
    title: "Sadhak",
    description: "Discover the timeless wisdom of Sanatana Dharma through spiritual teachings and practices",
    theme: "light",
  });
  const [logs, setLogs] = useState([
    { id: 1, action: "Logged in", user: "admin", time: "2025-06-24 10:00" },
    { id: 2, action: "Updated mantras", user: "admin", time: "2025-06-24 10:05" },
  ]);

  // Dashboard summary state
  const [searchMantra, setSearchMantra] = useState("");
  const [searchVideo, setSearchVideo] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for a persisted login state
    const storedLoginStatus = localStorage.getItem('adminLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      // If logged in, fetch data immediately
      fetchAllData();
    } else {
      setLoading(false); // Only set loading to false if no persisted session
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllData();
    }
  }, [isLoggedIn]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [mantrasResponse, videosResponse] = await Promise.all([
        fetch('/api/mantras'),
        fetch('/api/videos'),
      ]);

      const mantrasData = await mantrasResponse.json();
      const videosData = await videosResponse.json();

      setMantras(mantrasData);
      setVideos(videosData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast({
        title: "Error",
        description: "Failed to load data for admin panel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMantraChange = (index: number, field: keyof Mantra, value: string) => {
    const newMantras = [...mantras];
    newMantras[index] = { ...newMantras[index], [field]: value };
    setMantras(newMantras);
  };

  const handleVideoChange = (index: number, field: keyof Video, value: string) => {
    const newVideos = [...videos];
    newVideos[index] = { ...newVideos[index], [field]: value };
    setVideos(newVideos);
  };

  const handleSaveMantras = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mantras', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mantras),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Mantras updated successfully!",
          variant: "default",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to update mantras: ${errorData.message || response.statusText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to save mantras:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving mantras.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/videos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videos),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Videos updated successfully!",
          variant: "default",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to update videos: ${errorData.message || response.statusText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to save videos:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while saving videos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // VERY INSECURE: Hardcoded credentials for demonstration only
    if (username === 'admin' && password === 'password123') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true'); // Persist login state
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel.",
        variant: "default",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('adminLoggedIn'); // Clear login state from localStorage
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
  };

  // Add functions to add/remove mantras and videos
  const handleAddMantra = () => {
    setMantras([...mantras, { title: '', sanskrit: '', translation: '', benefits: '' }]);
  };
  const handleRemoveMantra = (index: number) => {
    if (window.confirm('Are you sure you want to remove this mantra?')) {
      setMantras(mantras.filter((_, i) => i !== index));
    }
  };
  const handleAddVideo = () => {
    setVideos([...videos, { title: '', url: '', description: '' }]);
  };
  const handleRemoveVideo = (index: number) => {
    if (window.confirm('Are you sure you want to remove this video?')) {
      setVideos(videos.filter((_, i) => i !== index));
    }
  };

  // User management handlers
  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) return;
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setLogs([{ id: Date.now(), action: `Added user ${newUser.username}`, user: "admin", time: new Date().toLocaleString() }, ...logs]);
    setNewUser({ username: "", role: "Editor", password: "" });
  };
  const handleRemoveUser = (id: number) => {
    const user = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    setLogs([{ id: Date.now(), action: `Removed user ${user?.username}`, user: "admin", time: new Date().toLocaleString() }, ...logs]);
  };
  const handleRoleChange = (id: number, newRole: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    setLogs([{ id: Date.now(), action: `Changed role for user ${users.find(u => u.id === id)?.username} to ${newRole}`, user: "admin", time: new Date().toLocaleString() }, ...logs]);
  };
  // Password reset modal state
  const [resetUserId, setResetUserId] = useState<number | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const handleResetPassword = (id: number) => {
    setResetUserId(id);
    setResetPassword("");
  };
  const handleConfirmResetPassword = () => {
    if (resetUserId === null || !resetPassword) return;
    setUsers(users.map(u => u.id === resetUserId ? { ...u, password: resetPassword } : u));
    const user = users.find(u => u.id === resetUserId);
    setLogs([{ id: Date.now(), action: `Password reset for user ${user?.username}`, user: "admin", time: new Date().toLocaleString() }, ...logs]);
    toast({ title: "Password Reset", description: `Password updated for ${user?.username}`, variant: "success" });
    setResetUserId(null);
    setResetPassword("");
  };
  const handleCancelResetPassword = () => {
    setResetUserId(null);
    setResetPassword("");
  };
  const handleSiteSettingsChange = (field: string, value: string) => {
    setSiteSettings({ ...siteSettings, [field]: value });
  };
  const handleSaveSettings = () => {
    setLogs([{ id: Date.now(), action: `Updated site settings`, user: "admin", time: new Date().toLocaleString() }, ...logs]);
    toast({ title: "Settings Saved", description: "Site settings updated (mocked)", variant: "default" });
  };

  // Export/import helpers
  const handleExport = (type: 'mantras' | 'videos') => {
    const data = type === 'mantras' ? mantras : videos;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleImport = (type: 'mantras' | 'videos', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (type === 'mantras') setMantras(data);
        else setVideos(data);
        toast({ title: 'Import Success', description: `Imported ${type} data.`, variant: 'default' });
      } catch {
        toast({ title: 'Import Error', description: 'Invalid JSON file.', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  };
  const handleExportLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleBulkDeleteMantras = () => {
    if (window.confirm('Delete ALL mantras?')) setMantras([]);
  };
  const handleBulkDeleteVideos = () => {
    if (window.confirm('Delete ALL videos?')) setVideos([]);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-deep-maroon">Loading admin panel...</div>;
  }

  if (!isLoggedIn) {
    return (
      <>
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
          <Card className="w-full max-w-sm p-6 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-deep-maroon">Admin Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-saffron hover:bg-deep-maroon text-white font-bold">
                  Login
                </Button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-4">
                Use username: <b>admin</b> and password: <b>password123</b> for this demo.
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-cream p-8 flex flex-col min-h-screen">
        <div className="flex-1 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
          <h1 className="text-3xl font-bold text-deep-maroon mb-8 text-center">Admin Panel</h1>
          <Button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white">
            Logout
          </Button>

          {/* Dashboard summary */}
          <div className={`flex flex-wrap gap-6 justify-center mb-8 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
            <div className="bg-saffron/10 rounded-xl p-6 min-w-[160px] text-center">
              <div className="text-2xl font-bold">{mantras.length}</div>
              <div className="text-sm">Mantras</div>
            </div>
            <div className="bg-saffron/10 rounded-xl p-6 min-w-[160px] text-center">
              <div className="text-2xl font-bold">{videos.length}</div>
              <div className="text-sm">Videos</div>
            </div>
            <div className="bg-saffron/10 rounded-xl p-6 min-w-[160px] text-center">
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm">Users</div>
            </div>
            <div className="bg-saffron/10 rounded-xl p-6 min-w-[160px] text-center">
              <div className="text-2xl font-bold">{logs.length}</div>
              <div className="text-sm">Logs</div>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-4 py-2 rounded-md transition-colors mt-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
          </div>

          <Tabs defaultValue="mantras" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mantras">Mantras</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="mantras" className="mt-8 space-y-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-deep-maroon">Mantras</h2>
                <Button onClick={handleAddMantra} className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-4 py-2 rounded-md transition-colors">Add New Mantra</Button>
              </div>
              {/* Search, export/import, and bulk delete */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                <input
                  type="text"
                  placeholder="Search mantras..."
                  value={searchMantra}
                  onChange={e => setSearchMantra(e.target.value)}
                  className="border rounded px-2 py-1 w-full md:w-1/3"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleExport('mantras')} className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-3 py-1 rounded">Export</button>
                  <label className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-3 py-1 rounded cursor-pointer">
                    Import
                    <input type="file" accept="application/json" onChange={e => handleImport('mantras', e)} className="hidden" />
                  </label>
                  <button onClick={handleBulkDeleteMantras} className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-1 rounded">Delete All</button>
                </div>
              </div>
              {mantras.filter(m => m.title.toLowerCase().includes(searchMantra.toLowerCase())).length === 0 && <div className="text-center text-gray-500">No mantras found.</div>}
              {mantras.filter(m => m.title.toLowerCase().includes(searchMantra.toLowerCase())).map((mantra, index) => (
                <Card key={index} className="border-golden-yellow/50 shadow-md">
                  <CardHeader className="bg-saffron/10 flex flex-row justify-between items-center">
                    <CardTitle className="text-xl text-deep-maroon">Edit Mantra {index + 1}</CardTitle>
                    <Button onClick={() => handleRemoveMantra(index)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Remove</Button>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor={`mantra-title-${index}`} className="text-deep-maroon">Title</Label>
                      <Input
                        id={`mantra-title-${index}`}
                        value={mantra.title}
                        onChange={(e) => handleMantraChange(index, 'title', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`mantra-sanskrit-${index}`} className="text-deep-maroon">Sanskrit</Label>
                      <Textarea
                        id={`mantra-sanskrit-${index}`}
                        value={mantra.sanskrit}
                        onChange={(e) => handleMantraChange(index, 'sanskrit', e.target.value)}
                        className="mt-1 font-sanskrit text-lg"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`mantra-translation-${index}`} className="text-deep-maroon">Translation</Label>
                      <Textarea
                        id={`mantra-translation-${index}`}
                        value={mantra.translation}
                        onChange={(e) => handleMantraChange(index, 'translation', e.target.value)}
                        className="mt-1 italic"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`mantra-benefits-${index}`} className="text-deep-maroon">Benefits</Label>
                      <Textarea
                        id={`mantra-benefits-${index}`}
                        value={mantra.benefits}
                        onChange={(e) => handleMantraChange(index, 'benefits', e.target.value)}
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={handleSaveMantras} className="mt-8 w-full bg-saffron hover:bg-deep-maroon text-white font-bold py-2 px-4 rounded-md transition-colors">
                Save Mantras
              </Button>
            </TabsContent>

            <TabsContent value="videos" className="mt-8 space-y-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-deep-maroon">Videos</h2>
                <Button onClick={handleAddVideo} className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-4 py-2 rounded-md transition-colors">Add New Video</Button>
              </div>
              {/* Search, export/import, and bulk delete */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchVideo}
                  onChange={e => setSearchVideo(e.target.value)}
                  className="border rounded px-2 py-1 w-full md:w-1/3"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleExport('videos')} className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-3 py-1 rounded">Export</button>
                  <label className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-3 py-1 rounded cursor-pointer">
                    Import
                    <input type="file" accept="application/json" onChange={e => handleImport('videos', e)} className="hidden" />
                  </label>
                  <button onClick={handleBulkDeleteVideos} className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-1 rounded">Delete All</button>
                </div>
              </div>
              {videos.filter(v => v.title.toLowerCase().includes(searchVideo.toLowerCase())).length === 0 && <div className="text-center text-gray-500">No videos found.</div>}
              {videos.filter(v => v.title.toLowerCase().includes(searchVideo.toLowerCase())).map((video, index) => (
                <Card key={index} className="border-golden-yellow/50 shadow-md">
                  <CardHeader className="bg-saffron/10 flex flex-row justify-between items-center">
                    <CardTitle className="text-xl text-deep-maroon">Edit Video {index + 1}</CardTitle>
                    <Button onClick={() => handleRemoveVideo(index)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Remove</Button>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor={`video-title-${index}`} className="text-deep-maroon">Title</Label>
                      <Input
                        id={`video-title-${index}`}
                        value={video.title}
                        onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`video-url-${index}`} className="text-deep-maroon">YouTube URL</Label>
                      <Input
                        id={`video-url-${index}`}
                        value={video.url}
                        onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`video-description-${index}`} className="text-deep-maroon">Description</Label>
                      <Textarea
                        id={`video-description-${index}`}
                        value={video.description}
                        onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={handleSaveVideos} className="mt-4 w-full bg-saffron hover:bg-deep-maroon text-white font-bold py-2 px-4 rounded-md transition-colors">
                Save Videos
              </Button>
            </TabsContent>

            <TabsContent value="users" className="mt-8">
              <div className="text-center text-deep-maroon text-xl font-bold mb-4">User Management</div>
              <div className="bg-saffron/10 rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    className="border rounded px-2 py-1"
                  />
                  <select
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Editor">Editor</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                  <Button onClick={handleAddUser} className="bg-saffron hover:bg-deep-maroon text-white font-bold px-4 py-2 rounded">Add User</Button>
                </div>
                <table className="w-full text-left mt-4">
                  <thead>
                    <tr className="text-deep-maroon">
                      <th className="py-2">Username</th>
                      <th className="py-2">Role</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="py-2">{user.username}</td>
                        <td className="py-2">
                          <select
                            value={user.role}
                            onChange={e => handleRoleChange(user.id, e.target.value)}
                            className="border rounded px-2 py-1 text-xs"
                          >
                            <option value="Editor">Editor</option>
                            <option value="Super Admin">Super Admin</option>
                          </select>
                        </td>
                        <td className="py-2 flex gap-2">
                          <Button onClick={() => handleResetPassword(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs">Reset Password</Button>
                          <Button onClick={() => handleRemoveUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Remove</Button>
                        </td>
      {/* Password Reset Modal */}
      {resetUserId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs flex flex-col gap-4">
            <h2 className="text-lg font-bold text-deep-maroon mb-2">Reset Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              value={resetPassword}
              onChange={e => setResetPassword(e.target.value)}
              className="border rounded px-2 py-1"
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={handleConfirmResetPassword} className="bg-saffron text-white px-4 py-2 rounded">Confirm</Button>
              <Button onClick={handleCancelResetPassword} className="bg-gray-300 text-charcoal px-4 py-2 rounded">Cancel</Button>
            </div>
          </div>
        </div>
      )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-saffron/10 rounded-xl p-6 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-deep-maroon font-bold">Activity Logs</div>
                  <button onClick={handleExportLogs} className="bg-golden-yellow hover:bg-saffron text-deep-maroon font-bold px-3 py-1 rounded">Export Logs</button>
                </div>
                <ul className="text-sm max-h-40 overflow-y-auto">
                  {logs.map(log => (
                    <li key={log.id} className="mb-1">[{log.time}] {log.user}: {log.action}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-8">
              <div className="text-center text-deep-maroon text-xl font-bold mb-4">Site Settings</div>
              <div className="bg-saffron/10 rounded-xl p-6 max-w-lg mx-auto">
                <div className="mb-4">
                  <label className="block text-deep-maroon font-semibold mb-1">Site Title</label>
                  <input
                    type="text"
                    value={siteSettings.title}
                    onChange={e => handleSiteSettingsChange('title', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-deep-maroon font-semibold mb-1">Description</label>
                  <textarea
                    value={siteSettings.description}
                    onChange={e => handleSiteSettingsChange('description', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    rows={2}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-deep-maroon font-semibold mb-1">Theme</label>
                  <select
                    value={siteSettings.theme}
                    onChange={e => handleSiteSettingsChange('theme', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <Button onClick={handleSaveSettings} className="bg-saffron hover:bg-deep-maroon text-white font-bold px-4 py-2 rounded w-full">Save Settings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Footer is now rendered globally via layout.tsx */}
      </div>
    </>
  );
}