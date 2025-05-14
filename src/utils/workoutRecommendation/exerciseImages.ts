
/**
 * Mapeamento de exercícios para URLs de imagens e vídeos específicos
 * Este arquivo centraliza as associações entre exercícios, suas imagens e vídeos correspondentes
 */

// Mapeamento de nomes de exercícios para URLs de imagens
export const exerciseImageMap: Record<string, string> = {
  "Abdominal bicicleta": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Abdominal_bicicleta%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWJkb21pbmFsX2JpY2ljbGV0YSAoMSkucG5nIiwiaWF0IjoxNzQ3MTg2MzQ4LCJleHAiOjQ5MDA3ODYzNDh9.Vjq5ac987JU8nLLYjDROBbD1-ziciGG_KiSrKJBZyqM",
  "Abdominal completo": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Abdominal_completo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWJkb21pbmFsX2NvbXBsZXRvLnBuZyIsImlhdCI6MTc0NzE4NjM2MywiZXhwIjoyMDQxMzI1MzM1NjN9.lVz5cvfx6li6bRan5JkB3XORq0cdrof9oSwmDQMTLx8",
  "Abdominal curto": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Abdominal_curto.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWJkb21pbmFsX2N1cnRvLnBuZyIsImlhdCI6MTc0NzE4NjM4MSwiZXhwIjo0MTY2NjM5OTYwMDAyMzgxfQ.8A3IDd62tyvO6uPvtueoje3-PJaKyAQ-H5JZ30BLT2E",
  "Abdominal infra": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Abdominal_infra.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWJkb21pbmFsX2luZnJhLnBuZyIsImlhdCI6MTc0NzE4NjM5NSwiZXhwIjozODg2MTM4NDAwMjM5NX0.oqm0LN1wYjC0Ysk9_5iLHhQnux1RfT80StDJiBfjukc",
  "Abdominal máquina": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Abdominal_maquina.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWJkb21pbmFsX21hcXVpbmEucG5nIiwiaWF0IjoxNzQ3MTg2NDA5LCJleHAiOjM4ODQ1NTQxMTQ0MDl9.P_6N7ZFsJfFjK_8VNVSvFEdt2Bfn4EC2zoGp-9gPlDw",
  "Abdução de quadril": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Abducao_de_quadril.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWJkdWNhb19kZV9xdWFkcmlsLnBuZyIsImlhdCI6MTc0NzE4NjQyMCwiZXhwIjozODkyMTYxNzc2MjQyMH0.L6kuqECT70w8fovtOmDjGRhcgB2n0OEjo756j39jq7k",
  "Afundo": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Afundo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWZ1bmRvLnBuZyIsImlhdCI6MTc0NzE4NjQ1MSwiZXhwIjo0MTQwMjQ4MDAyNDUxfQ.35Z1AjLJ9fngfGl0b3ZUkHzoAPeqZ1QFk0TCOt65uv8",
  "Afundo andando": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Afundo_andando.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWZ1bmRvX2FuZGFuZG8ucG5nIiwiaWF0IjoxNzQ3MTg2NDMyLCJleHAiOjM4ODQ1NTQxMTQ0MzJ9.ugCtY0iNiYoyhO7geMK0Da03BEBoCjSLG0QRD_PuHCQ",
  "Afundo búlgaro": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Afundo_bulgaro.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWZ1bmRvX2J1bGdhcm8ucG5nIiwiaWF0IjoxNzQ3MTg2NDY2LCJleHAiOjY3MjM5MDkyNjI0MjQ2Nn0.UVYDpXzgHW_5uF5YIU4_m_e_B3tenVE_jsrNzpBXU_c",
  "Afundo com salto": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Afundo_com_salto.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWZ1bmRvX2NvbV9zYWx0by5wbmciLCJpYXQiOjE3NDcxODY0NzgsImV4cCI6MzUzOTM2OTkyMzU0NDc4fQ.QKruUeK-Wu-AIlQspFbcM8Cz0xWKtdJvnwjfmaP0_bI",
  "Afundo estático": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Afundo_estatico.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWZ1bmRvX2VzdGF0aWNvLnBuZyIsImlhdCI6MTc0NzE4NjQ4OSwiZXhwIjo0MTM4MDg1ODExNDQ4OX0.05IkQ6oCkPc8jXx7WiCA8FNJMnGCQygNhXLPvNvUkuM",
  "Agachamento búlgaro": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Agachamento_bulgaro.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWdhY2hhbWVudG9fYnVsZ2Fyby5wbmciLCJpYXQiOjE3NDcxODY1MDIsImV4cCI6Mzg4MjgyODE4NDE4NTAyfQ.bUVe3nFlWuC48ZrxIUJAqFD6ElllpeeUWhhC3eMO6uQ",
  "Agachamento com salto": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Agachamento_com_salto.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWdhY2hhbWVudG9fY29tX3NhbHRvLnBuZyIsImlhdCI6MTc0NzE4NjUxMSwiZXhwIjozODgyOTI4MDM1NDUxMX0.qecp6wn3DlOdU4rmHoRfO27iB1V4Cl4Ng-xf-nJPq3Y",
  "Agachamento livre": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Agachamento_livre.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWdhY2hhbWVudG9fbGl2cmUucG5nIiwiaWF0IjoxNzQ3MTg2NTIxLCJleHAiOjM4ODI4MzEwMjI0MjUyMX0.vSbK2wtmhiQqeSqCuaxp_ouiwDmDAGUN_ptwdOO4LP0",
  "Agachamento na parede": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Agachamento_na_parede.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWdhY2hhbWVudG9fbmFfcGFyZWRlLnBuZyIsImlhdCI6MTc0NzE4NjUzOCwiZXhwIjozODg1Nzk3ODExNDUzOH0.KlS-zmDc_r9vqVPdQYqKOsLgOkPu6dPl91Zm4MAIybU",
  "Agachamento Smith": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Agachamento_Smith.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWdhY2hhbWVudG9fU21pdGgucG5nIiwiaWF0IjoxNzQ3MTg2NTQ4LCJleHAiOjEwNjM5NTg1MDEzNzQ4fQ.9f9Dd8oPTE-oUOZVqfdkyr_EK4L17BPuioocX-hD-Ig",
  "Agachamento sumô": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Agachamento_sumo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWdhY2hhbWVudG9fc3Vtby5wbmciLCJpYXQiOjE3NDcxODY1NjQsImV4cCI6Mzg4NDU1NDExNDU2NH0.W9GiqmpZqRcMbxVYeK1SrjQBaVzEqz73Qz0ht2d4FyQ",
  "Alongamento de isquiotibiais": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Alongamento_de_isquiotibiais.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWxvbmdhbWVudG9fZGVfaXNxdWlvdGliaWFpcy5wbmciLCJpYXQiOjE3NDcxODY1NzYsImV4cCI6Mzg4ODc3Mjg1ODExNDU3Nn0.ronp5b15xV8nut8WScncxfl5hqdvIlo9y8BYVXKSnsw",
  "Alongamento de ombros": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Alongamento_de_ombros.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWxvbmdhbWVudG9fZGVfb21icm9zLnBuZyIsImlhdCI6MTc0NzE4NjU5MywiZXhwIjozODgyODE4NTE0NDE4NTkzfQ.XD8B0GnNagCwBNKzZfQ3DlZX-FW8xBpRv_FHIBOmn4M",
  "Alongamento dinâmico": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Alongamento_dinamico.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWxvbmdhbWVudG9fZGluYW1pY28ucG5nIiwiaWF0IjoxNzQ3MTg2NjA2LCJleHAiOjM4ODQ1NTQxMTQ2MDZ9.gPfDiHc_ilSULhwQ1v1T2u3C3R376Z9YO5tSXYUhNaU",
  "Alongamento final": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Alongamento_final.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWxvbmdhbWVudG9fZmluYWwucG5nIiwiaWF0IjoxNzQ3MTg2NjE4LCJleHAiOjM4OTE5MzA4NTU0MTE0NjE2fQ.NgprdjPzPGtvcS0sHpcasYZosE9nhhhGWb9dI_OV5Hc",
  "Alongamento passivo": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Alongamento%20passivo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWxvbmdhbWVudG8gcGFzc2l2by5wbmciLCJpYXQiOjE3NDcxODY2MzAsImV4cCI6NzMyNjE4NDQyMTE0NjMwfQ.aYCulWK9hHnkAVwvJN5M65P_aU8pPPi6txky5lOhaNo",
  "Australian pull-up": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Australian%20pull-up.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQXVzdHJhbGlhbiBwdWxsLXVwLnBuZyIsImlhdCI6MTc0NzE4NjY1NywiZXhwIjozODgyODE1OTYwMDAyNjU3fQ.0_W_Ky33MSCSfyYZhC0MpkBJ__oQbA3uUqP08NHms_0",
  "Bicicleta ergométrica": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Bicicleta_ergometrica.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQmljaWNsZXRhX2VyZ29tZXRyaWNhLnBuZyIsImlhdCI6MTc0NzE4NjY3MCwiZXhwIjozODg2MjIxMjgwMzU0NjcwfQ.p-uUcpmNTa5r8nhGn2aoZCzmQO5p5IlG68lAcd0xZOQ",
  "Burpee": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Burpee.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQnVycGVlLnBuZyIsImlhdCI6MTc0NzE4NjY4MCwiZXhwIjozODg1NjU2NzU0NDE4NjgwfQ.nE8nKIIkvAcApnS1KIqEFUKJSvDXAW9mlFITnsv4CzA",
  "Cadeira extensora": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Cadeira_extensora.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FkZWlyYV9leHRlbnNvcmEucG5nIiwiaWF0IjoxNzQ3MTg2NjkwLCJleHAiOjczMjYzNzU0MTE0NjkwfQ.LApvvJWkPPgH-C2NqGshssZEGUmynC6l_dy-4eIASy0",
  "Cadeira flexora": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Cadeira_flexora.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FkZWlyYV9mbGV4b3JhLnBuZyIsImlhdCI6MTc0NzE4NjcwNCwiZXhwIjo2NzMwMTg5MDI2MTA3MDR9.erLAiR6JtNDS78uldhFlefNAd_9NxUZtiAX23Jdwu9g",
  "Caminhada": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Caminhada.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FtaW5oYWRhLnBuZyIsImlhdCI6MTc0NzE4NjcxNiwiZXhwIjozODg0NTU0MTE0NzE2fQ.FmOxOCGMKkBu1_9XiZ_r4w9cjNjiVexEAjGerG0zFdM",
  "Caminhada em terreno inclinado": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Caminhada%20em%20terreno%20inclinado.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FtaW5oYWRhIGVtIHRlcnJlbm8gaW5jbGluYWRvLnBuZyIsImlhdCI6MTc0NzE4NjcyNSwiZXhwIjozODgyOTg0ODAwMjcyNX0.KXz6H7A2kg8qcr4fv6l-xYOQqSZHjd_dHFuy7I_Vsdk",
  "Caminhada no lugar": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Caminhada%20no%20lugar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FtaW5oYWRhIG5vIGx1Z2FyLnBuZyIsImlhdCI6MTc0NzE4NjczNiwiZXhwIjozODg0NTU0MTE0NzM2fQ.36a3Ke0WBuhaGIxQyxHxewYXjksNtpcju_ZVNVvwasg",
  "Cardio leve": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Cardio%20leve.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FyZGlvIGxldmUucG5nIiwiaWF0IjoxNzQ3MTg2NzUzLCJleHAiOjM4ODczMjkyODI3NTN9.WN4NwbFMYZuVANIwKugm5eAXTYji6nCl6V7twglpkcM",
  "Cardio misto": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Cardio%20misto.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FyZGlvIG1pc3RvLnBuZyIsImlhdCI6MTc0NzE4Njc2NSwiZXhwIjoxMDg5MDc2ODUxMTA2NzY1fQ.HhGN9OS9gDFaCYNW1WFq5EyzXdPvrJDHPmkNSCYXJew",
  "Cardio moderado": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Cardio%20moderado.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ2FyZGlvIG1vZGVyYWRvLnBuZyIsImlhdCI6MTc0NzE4Njc3OSwiZXhwIjozODg0NTU0MTE0Nzc5fQ.Kugu0PfrtbaYVE14xL5Jtab8IH4LKVO1hUSVG3mKGhk",
  "Corrida em ladeira": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Corrida%20em%20ladeira.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ29ycmlkYSBlbSBsYWRlaXJhLnBuZyIsImlhdCI6MTc0NzE4Njc4OSwiZXhwIjozODg0NTU0MTE0Nzg5fQ.n4Fy10zgVV75HXmZg4p7e5YDpTu2wYYRYsR3pLtPuG8",
  "Corrida leve": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Corrida%20leve.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ29ycmlkYSBsZXZlLnBuZyIsImlhdCI6MTc0NzE4NjgwOCwiZXhwIjozODgyNzY4NTgxMTQ4MDh9.YCrd857F17MMwfHt8yuC6IrcUPF8SkLcljOif1LMjKs",
  "Crucifixo": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Crucifixo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ3J1Y2lmaXhvLnBuZyIsImlhdCI6MTc0NzE4NjgyNSwiZXhwIjozOTAwMTg0MTg4MjV9.ZAjPKjh8JBlQv_NrrlPdSBIZZoLEp1edvG7_qC3xMRU",
  "Crucifixo máquina": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Crucifixo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ3J1Y2lmaXhvLnBuZyIsImlhdCI6MTc0NzE4Njg3MCwiZXhwIjozODIzMjI1MTQ0MTg4NzB9.-IEJYV_WHvwU5turw1X1OJK7ltz1Img6PvCLSb5OAzs",
  "Crucifixo na máquina": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Crucifixo_maquina.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ3J1Y2lmaXhvX21hcXVpbmEucG5nIiwiaWF0IjoxNzQ3MTg2ODM4LCJleHAiOjM4ODI4MTg1MTQ0MTg4Mzh9.AB4Kw5PCATem13ONmDkTGFG4sI_0j3hxdYyCfMrXd-4",
  "Crunch abdominal": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Crunch_abdominal.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQ3J1bmNoX2FiZG9taW5hbC5wbmciLCJpYXQiOjE3NDcxODY4ODYsImV4cCI6NjY3ODgyMTE0ODg2fQ.VaXe4HlkDvzcASpIFsAFcBM9fGD8oOpxqXhI3FsVSoQ",
  "Desenvolvimento com halteres": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Desenvolvimento_com_halteres.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRGVzZW52b2x2aW1lbnRvX2NvbV9oYWx0ZXJlcy5wbmciLCJpYXQiOjE3NDcxODY4OTgsImV4cCI6Mzg4NDU1NDExNDg5OH0.WmbqZNhOCV-pliZc6BeSBuEhhfxE-i3UzlvFjL5ZCDs",
  "Desenvolvimento máquina": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Desenvolvimento_maquina.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRGVzZW52b2x2aW1lbnRvX21hcXVpbmEucG5nIiwiaWF0IjoxNzQ3MTg2OTEwLCJleHAiOjM4ODI4MTI1NTQxMTQ5MTB9.0c70kI19NGpZQ9D8S9y85BAY6LxtZajk-c4QzsC-jKw",
  "Dips em cadeira": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Dips%20em%20cadeira.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRGlwcyBlbSBjYWRlaXJhLnBuZyIsImlhdCI6MTc0NzE4NjkyMCwiZXhwIjozODg0NTU0MTE0OTIwfQ.CMMCXzYiqsWHv_Y0jPu_LSXs7bcUsnB7CWzE1LFtHQc",
  "Dragon flag": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Dragon%20flag.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRHJhZ29uIGZsYWcucG5nIiwiaWF0IjoxNzQ3MTg2OTQ1LCJleHAiOjQ0MDY4NDk4OTQ1fQ.4g7FligXOMaQkQ1b_hjx_WBVnVrnqoIHDkB3HRqYuYo",
  "Elevação de pernas": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Elevacao_de_pernas.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRWxldmFjYW9fZGVfcGVybmFzLnBuZyIsImlhdCI6MTc0NzE4Njk3OSwiZXhwIjoxMzY2Mjc4MTk2NDk4OTc5fQ.gJL2fN5xWNaTIQj0HLIJzSjQsnCADm-DRJ9HYHKdtFE",
  "Elevação frontal": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Elevacao_frontal.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRWxldmFjYW9fZnJvbnRhbC5wbmciLCJpYXQiOjE3NDcxODY5OTIsImV4cCI6NzI5MjExMjY4NjI0Mjk5Mn0.baPdw4KjA2KgWYt09Mw0EX6YieBaVTn088eaylLhnBE",
  "Elevação lateral": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Elevacao_lateral.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRWxldmFjYW9fbGF0ZXJhbC5wbmciLCJpYXQiOjE3NDcxODcwMDEsImV4cCI6MTMxNjI2MTQyMDF9.1n4TXpojpKBl4RcjJ-7kHppwy06y3_IRpt9iMZwX1Ok",
  "Elevação pélvica": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Elevacao_pelvica.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRWxldmFjYW9fcGVsdmljYS5wbmciLCJpYXQiOjE3NDcxODcwMTYsImV4cCI6MzkwMDE4NDE5MDE2fQ._qKTf4FgbZ__RQeslG1BiQGKMVlrg21hYp8CZJ24mi0",
  "Elíptico": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Eliptico.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRWxpcHRpY28ucG5nIiwiaWF0IjoxNzQ3MTg3MDI5LCJleHAiOjM4OTA1MTQ0MTkwMjl9.fNjPKnlMA4bxiC68FLaN0dwtgMqsVzWu7xGXasEmVt0",
  "Escalador": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Escalador.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRXNjYWxhZG9yLnBuZyIsImlhdCI6MTc0NzE4NzA0MiwiZXhwIjo2ODk1MDQwMzA0Mn0.s_5es_lk7_2RmIBxhhs2qDfkRqrmVQ8Q2EoC3oejFfs",
  "Esteira": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Esteira.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRXN0ZWlyYS5wbmciLCJpYXQiOjE3NDcxODcwNTIsImV4cCI6MjgxMDk0Mzg1Mn0.hTJJcjKg4SGkseZY_nmZK2qM9bKqR1SF4HQP8djxTi0",
  "Face pull": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Face_pull.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRmFjZV9wdWxsLnBuZyIsImlhdCI6MTc0NzE4NzA3MSwiZXhwIjozODg0NTU0MTE1MDcxfQ.douBOlWHAZiHthrUiucZ5-17D067l5gFL05zigfdQU0",
  "Flexão de braço": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Flexao_de_braco.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRmxleGFvX2RlX2JyYWNvLnBuZyIsImlhdCI6MTc0NzE4NzA5NSwiZXhwIjozOTAwMTg0MTkwOTV9.Vl5sIWNJCgR-1pGzpwGXOZpSCEVK1AZsGDIPkh0OwZY",
  "Flexão declinada": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Flexao_declinada.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRmxleGFvX2RlY2xpbmFkYS5wbmciLCJpYXQiOjE3NDcxODcxMDgsImV4cCI6Mzg4NDU1NDExNTEwOH0.mIdVPjFAotmUrMTXn8NsbwI-qo0YyyZB6-lcigQUdRA",
  "Flexão na parede": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Flexao_na_parede.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvRmxleGFvX25hX3BhcmVkZS5wbmciLCJpYXQiOjE3NDcxODcxMjIsImV4cCI6Mzg4NDU1NDExNTEyMn0.qvinCU11lP0WXJSHMVafJwytiWg2a9RCUOPY01nS9X0",
  "Gato-vaca": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Gato-vaca.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvR2F0by12YWNhLnBuZyIsImlhdCI6MTc0NzE4NzEzNCwiZXhwIjozODg0NTU0MTE1MTM0fQ.H8XG4uXRSpdPPfC__veIzyzRURuFVDrbGEloZA-kH2k",
  "Handstand push-up na parede": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Handstand%20push-up%20na%20parede.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvSGFuZHN0YW5kIHB1c2gtdXAgbmEgcGFyZWRlLnBuZyIsImlhdCI6MTc0NzE4NzE0OSwiZXhwIjoxMzY4MDEyODUxMTQ5fQ.Js8vuM_h28xxvXmhylri82MuBtW1qXewYQpoj8frtVY",
  "HIIT": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/HIIT.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvSElJVC5wbmciLCJpYXQiOjE3NDcxODcxNjYsImV4cCI6Mzg4NDU1NDExNTE2Nn0.KXmBetfxhZuWy8WZlcPAQb6yKoF78zDK1GmroBuiGEQ",
  "Hollow hold": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Hollow%20hold.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvSG9sbG93IGhvbGQucG5nIiwiaWF0IjoxNzQ3MTg3MTc4LCJleHAiOjM4ODQ1NTQxMTUxNzh9.EN3-3mfAJIa1nOdS8F7rtLNW9bZ3w6xjAuHOJEoY_tQ"
};

// Mapeamento de nomes de exercícios para URLs de vídeos
export const exerciseVideoMap: Record<string, string> = {
  "Abdominal bicicleta": "https://vimeo.com/570418723",
  "Abdominal completo": "https://vimeo.com/458656744",
  "Abdominal curto": "https://vimeo.com/562033518",
  "Abdominal infra": "https://vimeo.com/559136942",
  "Abdução de quadril": "https://vimeo.com/1007396947",
  "Afundo": "https://vimeo.com/591087584",
  "Afundo andando": "https://vimeo.com/591087584",
  "Afundo búlgaro": "https://vimeo.com/716855850",
  "Afundo com salto": "https://vimeo.com/1070471830",
  "Afundo estático": "https://vimeo.com/1077938106",
  "Agachamento búlgaro": "https://vimeo.com/471440654",
  "Agachamento com salto": "https://vimeo.com/482899311",
  "Agachamento livre": "https://vimeo.com/560469740",
  "Agachamento na parede": "https://vimeo.com/458732080",
  "Agachamento Smith": "https://vimeo.com/1074491796",
  "Agachamento sumô": "https://vimeo.com/569024196",
  "Alongamento de isquiotibiais": "https://vimeo.com/576475475",
  "Alongamento de ombros": "https://vimeo.com/585565189",
  "Alongamento dinâmico": "https://vimeo.com/463450280",
  "Aquecimento dinâmico": "https://vimeo.com/358550035",
  "Australian pull-up": "https://vimeo.com/539951634",
  "Bicicleta ergométrica": "https://vimeo.com/1049763887",
  "Burpee": "https://vimeo.com/560258550",
  "Cadeira extensora": "https://vimeo.com/245040059",
  "Cadeira flexora": "https://vimeo.com/245040184",
  "Crucifixo": "https://vimeo.com/716857575",
  "Crucifixo máquina": "https://vimeo.com/494208405",
  "Crucifixo na máquina": "https://vimeo.com/563388808",
  "Crunch abdominal": "https://vimeo.com/458656869",
  "Desenvolvimento com halteres": "https://vimeo.com/716846478",
  "Desenvolvimento máquina": "https://vimeo.com/1037196793",
  "Dips em cadeira": "https://www.youtube.com/watch?v=HCf97NPYeGY",
  "Dragon flag": "https://vimeo.com/602438981",
  "Elevação de calcanhar": "https://vimeo.com/439121024",
  "Elevação de panturrilha": "https://vimeo.com/1051293037",
  "Elevação de pernas": "https://vimeo.com/262269915",
  "Elevação frontal": "https://vimeo.com/245013621",
  "Elevação lateral": "https://vimeo.com/245016384",
  "Elevação lateral de braços": "https://vimeo.com/563390751",
  "Elevação pélvica": "https://vimeo.com/716853044",
  "Escalador": "https://vimeo.com/377381159",
  "Flexão archer": "https://vimeo.com/1049842087",
  "Flexão com apoio elevado": "https://vimeo.com/249714023",
  "Flexão com palma": "https://www.youtube.com/watch?v=aEk3DDFnDuw",
  "Flexão de braço": "https://vimeo.com/467746018",
  "Flexão de braço no banco": "https://www.youtube.com/watch?v=lZC8ak-axMM",
  "Flexão de braço no joelho": "https://vimeo.com/554854721",
  "Flexão declinada": "https://vimeo.com/1049842045",
  "Flexão hindu": "https://vimeo.com/1049852404",
  "Flexão na parede": "https://vimeo.com/569185083",
  "Flexões diamante": "https://vimeo.com/560258760",
  "Handstand push-up na parede": "https://www.youtube.com/watch?v=XckEEwa1BPI",
  "Hollow hold": "https://vimeo.com/509676778"
};

/**
 * Função para obter a URL da imagem de um exercício
 * @param exerciseName Nome do exercício
 * @returns URL da imagem específica ou URL de fallback
 */
export const getExerciseImageUrl = (exerciseName: string): string => {
  // Verifica se existe uma imagem específica para o exercício
  if (exerciseImageMap[exerciseName]) {
    return exerciseImageMap[exerciseName];
  }
  
  // Fallback para URL genérica baseada no nome do exercício
  return `https://source.unsplash.com/random/400x300/?${encodeURIComponent(exerciseName.replace(' ', '-'))}&fitness`;
};

/**
 * Função para obter a URL do vídeo de um exercício
 * @param exerciseName Nome do exercício
 * @returns URL do vídeo ou null se não existir
 */
export const getExerciseVideoUrl = (exerciseName: string): string | null => {
  return exerciseVideoMap[exerciseName] || null;
};
