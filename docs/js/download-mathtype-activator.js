const downloadMathtypeActivator = {
  template: `
<div>
  <downloader :content="content" :file-name="fileName" :file-type="fileType"></downloader>
</div>
  `,
  data() {
    return {
      content: `
Windows Registry Editor Version 5.00

[-HKEY_CURRENT_USER\\Software\\JavaSoft\\Prefs\\com\\wiris\\editor\\license\\]
[HKEY_CURRENT_USER\\Software\\JavaSoft\\Prefs\\com\\wiris\\editor\\license\\]
"/Cv/E/C81+j/Rw/U/E6ws/Znt/Os/K/Q=="="11/M/P/Ir/Y/B/S/P/Pr/Q/L/Ny/T9s4/Iw=="
"/Mz/Bhef/D/Q/Hs30/U6/F/Pdl/R/Xsg=="="/S/Zd8c/Ai/Z/A83028s6/Kn/Gf/M/Q=="
"vi/L/M7/K/Hb/C/O/A/K/X9uuis/O1/J/A=="="/S/Zd8c/Ai/Z/A80\\\\/O/S/C/Vgp\\\\0/P/Q=="
"wm/U/C/Y/T/Nz5/Tw="="/Wna/F/W3q/I/Yp/V\\\\lj/Dedai56/Ur/Wpf/P/Kpl/Soh/A/Z/Qe\\\\6hit3ym\\\\6m5sp/B/B/Q=="
"x/W/Yrj/M/Db/Bds="="104z/W8rbqpw5\\\\/Qz0/C/Q/Opu/Dj/B5b/Dwsy77"
      `.trim(),
      fileName: 'MathType 7',
      fileType: 'reg',
    };
  },
};

export default downloadMathtypeActivator;