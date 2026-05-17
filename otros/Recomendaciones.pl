% ==========================================
% CONFIGURADOR DE PC - RECOMENDACIONES
% ==========================================

% ==========================================
% PROCESADORES (CPUs)
% ==========================================
% Intel 13th Gen
cpu(intel_i3_13100, intel, 'Intel Core i3-13100', 150, 'Trabajo de oficina', 'Básico', 'LGA 1700').
cpu(intel_i5_13400, intel, 'Intel Core i5-13400', 280, 'Gaming/Productividad', 'Buen rendimiento', 'LGA 1700').
cpu(intel_i5_13600k, intel, 'Intel Core i5-13600K', 320, 'Gaming/Productividad', 'Alto rendimiento', 'LGA 1700').
cpu(intel_i7_13700k, intel, 'Intel Core i7-13700K', 400, 'Gaming/Streaming/Productividad', 'Muy alto rendimiento', 'LGA 1700').
cpu(intel_i9_13900k, intel, 'Intel Core i9-13900K', 580, 'Gaming/Streaming/Profesional', 'Máximo rendimiento', 'LGA 1700').

% AMD Ryzen 7000
cpu(amd_ryzen_5_7600x, amd, 'AMD Ryzen 5 7600X', 300, 'Gaming', 'Muy buen rendimiento', 'AM5').
cpu(amd_ryzen_5_5600x, amd, 'AMD Ryzen 5 5600X', 220, 'Gaming 1080p', 'Buen rendimiento', 'AM4').
cpu(amd_ryzen_7_7700x, amd, 'AMD Ryzen 7 7700X', 370, 'Gaming/Streaming', 'Excelente rendimiento', 'AM5').
cpu(amd_ryzen_7_7700, amd, 'AMD Ryzen 7 7700', 350, 'Gaming/Streaming', 'Excelente rendimiento', 'AM5').
cpu(amd_ryzen_9_7950x, amd, 'AMD Ryzen 9 7950X', 550, 'Gaming/Streaming/Profesional', 'Máximo rendimiento', 'AM5').

% ==========================================
% TARJETAS GRÁFICAS (GPUs)
% ==========================================
% NVIDIA RTX
gpu(nvidia_rtx_4060, nvidia, 'NVIDIA GeForce RTX 4060', 280, 'Gaming 1080p', 'Entrada', '8GB GDDR6').
gpu(nvidia_rtx_4060_ti, nvidia, 'NVIDIA GeForce RTX 4060 Ti', 360, 'Gaming 1080p/1440p', 'Entrada-Media', '8GB GDDR6').
gpu(nvidia_rtx_4070, nvidia, 'NVIDIA GeForce RTX 4070', 600, 'Gaming 1440p/2K', 'Gama media', '12GB GDDR6X').
gpu(nvidia_rtx_4070_super, nvidia, 'NVIDIA GeForce RTX 4070 SUPER', 650, 'Gaming 1440p/2K', 'Gama media-alta', '12GB GDDR6X').
gpu(nvidia_rtx_4080, nvidia, 'NVIDIA GeForce RTX 4080', 1100, 'Gaming 2K/4K', 'Gama alta', '16GB GDDR6X').
gpu(nvidia_rtx_4090, nvidia, 'NVIDIA GeForce RTX 4090', 1600, 'Gaming 4K/Streaming', 'Gama alta', '24GB GDDR6X').

% AMD RDNA 3
gpu(amd_rx_6600, amd, 'AMD Radeon RX 6600', 200, 'Gaming 1080p', 'Entrada', '8GB GDDR6').
gpu(amd_rx_7600, amd, 'AMD Radeon RX 7600', 250, 'Gaming 1080p', 'Entrada', '16GB GDDR6').
gpu(amd_rx_7700xt, amd, 'AMD Radeon RX 7700 XT', 400, 'Gaming 1440p', 'Gama media', '12GB GDDR6').
gpu(amd_rx_7800xt, amd, 'AMD Radeon RX 7800XT', 500, 'Gaming 1440p/2K', 'Gama media', '16GB GDDR6').
gpu(amd_rx_7900xt, amd, 'AMD Radeon RX 7900 XT', 700, 'Gaming 2K/4K', 'Gama alta', '20GB GDDR6').
gpu(amd_rx_7900xtx, amd, 'AMD Radeon RX 7900 XTX', 900, 'Gaming 4K', 'Gama alta', '24GB GDDR6').

% Intel Arc
gpu(intel_arc_a380, intel, 'Intel Arc A380', 140, 'Gaming 1080p', 'Entrada', '6GB GDDR6').
gpu(intel_arc_a770, intel, 'Intel Arc A770', 350, 'Gaming 1080p/1440p', 'Buena relación precio', '8GB GDDR6').

% ==========================================
% MEMORIA RAM
% ==========================================
% DDR5
ram(corsair_16gb_ddr5_6000, corsair, 'Corsair Vengeance 16GB DDR5 6000MHz', 120, 'Gaming/Productividad', 'Estándar', 'DDR5').
ram(corsair_32gb_ddr5_6000, corsair, 'Corsair Vengeance 32GB DDR5 6000MHz', 240, 'Productividad/Streaming', 'Premium', 'DDR5').
ram(corsair_64gb_ddr5_6000, corsair, 'Corsair Vengeance 64GB DDR5 6000MHz', 480, 'Productividad profesional', 'Ultra', 'DDR5').
ram(g_skill_16gb_ddr5_6000, g_skill, 'G.Skill Trident Z5 16GB DDR5 6000MHz', 130, 'Gaming', 'Premium', 'DDR5').
ram(g_skill_32gb_ddr5_6000, g_skill, 'G.Skill Trident Z5 32GB DDR5 6000MHz', 250, 'Gaming profesional', 'Premium', 'DDR5').
ram(kingston_16gb_ddr5_5600, kingston, 'Kingston Fury Beast 16GB DDR5 5600MHz', 110, 'Gaming general', 'Buena', 'DDR5').
ram(Kingston_32gb_ddr5_5600, kingston, 'Kingston Fury Beast 32GB DDR5 5600MHz', 220, 'Gaming/Productividad', 'Buena', 'DDR5').

% DDR4
ram(corsair_16gb_ddr4_3600, corsair, 'Corsair Vengeance 16GB DDR4 3600MHz', 75, 'Gaming AMD', 'Estándar', 'DDR4').
ram(corsair_32gb_ddr4_3600, corsair, 'Corsair Vengeance 32GB DDR4 3600MHz', 150, 'Productividad', 'Premium', 'DDR4').
ram(kingston_16gb_ddr4_3200, kingston, 'Kingston Fury Beast 16GB DDR4 3200MHz', 60, 'Uso general', 'Básica', 'DDR4').
ram(g_skill_16gb_ddr4_3600, g_skill, 'G.Skill Trident Z 16GB DDR4 3600MHz', 80, 'Gaming', 'Premium', 'DDR4').
ram(kingston_32gb_ddr4_3200, kingston, 'Kingston ValueRAM 32GB DDR4 3200MHz', 100, 'Servidor/Workstation', 'Profesional', 'DDR4').

% ==========================================
% ALMACENAMIENTO
% ==========================================
% SSD NVMe M.2
storage(samsung_970_evo_500gb, samsung, 'Samsung 970 EVO Plus 500GB NVMe', 60, 'Alto rendimiento', 'Rápido', 'NVMe M.2').
storage(samsung_970_evo_1tb, samsung, 'Samsung 970 EVO Plus 1TB NVMe', 100, 'Alto rendimiento', 'Rápido', 'NVMe M.2').
storage(samsung_970_evo_2tb, samsung, 'Samsung 970 EVO Plus 2TB NVMe', 180, 'Alto rendimiento', 'Muy rápido', 'NVMe M.2').
storage(wd_black_sn850x_1tb, wd, 'WD Black SN850X 1TB NVMe', 90, 'Gaming/Profesional', 'Ultra rápido', 'NVMe M.2').
storage(wd_black_sn850x_2tb, wd, 'WD Black SN850X 2TB NVMe', 160, 'Gaming/Profesional', 'Ultra rápido', 'NVMe M.2').
storage(wd_blue_sn580_1tb, wd, 'WD Blue SN580 1TB SSD', 80, 'General', 'Buena relación precio', 'NVMe M.2').
storage(kingston_fury_beast_1tb, kingston, 'Kingston Fury Beast 1TB NVMe', 85, 'Gaming', 'Rápido', 'NVMe M.2').
storage(corsair_mp600_1tb, corsair, 'Corsair MP600 CORE 1TB NVMe', 75, 'General', 'Buena relación', 'NVMe M.2').
storage(corsair_mp600_elite_2tb, corsair, 'Corsair MP600 ELITE 2TB NVMe', 140, 'Gaming/Trabajo', 'Rápido', 'NVMe M.2').

% SSD SATA
storage(samsung_870_evo_500gb, samsung, 'Samsung 870 EVO 500GB SSD SATA', 50, 'General', 'Confiable', 'SSD 2.5"').
storage(samsung_870_evo_1tb, samsung, 'Samsung 870 EVO 1TB SSD SATA', 80, 'General', 'Confiable', 'SSD 2.5"').
storage(wd_blue_ssd_1tb, wd, 'WD Blue 1TB SSD SATA', 70, 'Almacenamiento secundario', 'Económico', 'SSD 2.5"').
storage(crucial_mx500_1tb, crucial, 'Crucial MX500 1TB SSD SATA', 75, 'General', 'Confiable', 'SSD 2.5"').

% HDD
storage(seagate_barracuda_2tb, seagate, 'Seagate Barracuda 2TB HDD', 50, 'Almacenamiento extra', 'Barato', 'HDD 3.5"').
storage(seagate_barracuda_4tb, seagate, 'Seagate Barracuda 4TB HDD', 80, 'Almacenamiento extra', 'Económico', 'HDD 3.5"').
storage(wd_purple_2tb, wd, 'WD Purple 2TB HDD (Vigilancia)', 55, 'Respaldo', 'Confiable', 'HDD 3.5"').
storage(seagate_ironwolf_4tb, seagate, 'Seagate IronWolf 4TB HDD (NAS)', 100, 'NAS/Servidor', 'Profesional', 'HDD 3.5"').

% ==========================================
% FUENTES DE PODER
% ==========================================
power_supply(msi_550w_bronze, msi, 'MSI MAG A550GL 550W Bronze', 70, 'Uso general/Entry Gaming', '550W', 'Bronze').
power_supply(corsair_650w_bronze, corsair, 'Corsair CV650 650W Bronze', 80, 'Gaming Medio', '650W', 'Bronze').
power_supply(evga_600w_bronze, evga, 'EVGA 600 W1 600W Bronze', 65, 'Uso general', '600W', 'Bronze').

power_supply(corsair_750w_gold, corsair, 'Corsair RM750x 750W Gold', 120, 'Gaming equilibrado', '750W', 'Gold').
power_supply(seasonic_750w_gold, seasonic, 'Seasonic FOCUS Plus 750W Gold', 130, 'Gaming', '750W', 'Gold').
power_supply(msi_750w_gold, msi, 'MSI MPG A750GF 750W Gold', 125, 'Gaming alto rendimiento', '750W', 'Gold').
power_supply(evga_750w_gold, evga, 'EVGA SuperNOVA 750W Gold', 115, 'Gaming', '750W', 'Gold').

power_supply(corsair_850w_gold, corsair, 'Corsair RM850x 850W Gold', 140, 'Gaming alto rendimiento', '850W', 'Gold').
power_supply(seasonic_850w_gold, seasonic, 'Seasonic FOCUS Plus 850W Gold', 145, 'Gaming 4K/Workstation', '850W', 'Gold').
power_supply(msi_850w_gold, msi, 'MSI MPG A850GF 850W Gold', 150, 'Gaming/Streaming', '850W', 'Gold').

power_supply(corsair_1000w_gold, corsair, 'Corsair RM1000x 1000W Gold', 180, 'Gaming Extremo/Dual GPU', '1000W', 'Gold').
power_supply(seasonic_1000w_gold, seasonic, 'Seasonic FOCUS Plus 1000W Gold', 185, 'Gaming Extremo', '1000W', 'Gold').

power_supply(corsair_1200w_platinum, corsair, 'Corsair HX1200 1200W Platinum', 220, 'Gaming Extremo Premium', '1200W', 'Platinum').
power_supply(seasonic_1200w_titanium, seasonic, 'Seasonic PRIME 1200W Titanium', 250, 'Gaming Extremo Profesional', '1200W', 'Titanium').

% ==========================================
% DISIPADORES DE CALOR (REFRIGERACIÓN)
% ==========================================
% Air Coolers
cooler(noctua_nh_d15, noctua, 'Noctua NH-D15 Chromax', 95, 'CPU air cooler premium', 'Excelente/Silencioso', 'Air').
cooler(noctua_nh_l9a, noctua, 'Noctua NH-L9a-AM5', 50, 'Compacto/ITX', 'Compacto pero eficiente', 'Air').
cooler(be_quiet_dark_rock_pro_4, be_quiet, 'be quiet! Dark Rock Pro 4', 90, 'Air cooler high-end', 'Muy silencioso', 'Air').
cooler(be_quiet_pure_rock_2, be_quiet, 'be quiet! Pure Rock 2', 55, 'Air cooler mid-range', 'Silencioso', 'Air').
cooler(arctic_freezer_34_esports, arctic, 'Arctic Freezer 34 eSports', 45, 'Gaming entry', 'Buena relación precio', 'Air').
cooler(arctic_freezer_34_esports_duo, arctic, 'Arctic Freezer 34 eSports DUO', 55, 'Gaming general', 'Excelente refrigeración', 'Air').
cooler(corsair_a70_pro, corsair, 'Corsair A70 PRO', 65, 'Gaming mid-range', 'Buen rendimiento', 'Air').
cooler(deepcool_gammaxx_400_v2, deepcool, 'DEEPCOOL GAMMAXX 400 V2', 30, 'Budget', 'Económico', 'Air').

% Liquid Coolers (AIO)
cooler(corsair_h150i_elite_capellix, corsair, 'Corsair iCUE H150i Elite CapelliX', 180, 'Liquid cooling premium 360mm', 'Máximo rendimiento', 'Liquid 360mm').
cooler(corsair_h100i_elite_capellix, corsair, 'Corsair iCUE H100i Elite CapelliX', 140, 'Liquid cooling mid 240mm', 'Excelente rendimiento', 'Liquid 240mm').
cooler(nzxt_kraken_z73, nzxt, 'NZXT Kraken Z73', 190, 'Liquid premium con pantalla', 'Máximo rendimiento+Estilo', 'Liquid 360mm').
cooler(nzxt_kraken_z63, nzxt, 'NZXT Kraken Z63', 160, 'Liquid mid con pantalla', 'Muy buen rendimiento', 'Liquid 280mm').
cooler(msi_mag_coreliquid_360r, msi, 'MSI MAG CORELIQUID 360R', 130, 'Liquid gaming 360mm', 'Buen rendimiento', 'Liquid 360mm').
cooler(be_quiet_dark_rock_liquid_360, be_quiet, 'be quiet! Dark Rock Liquid', 150, 'Liquid silencioso 360mm', 'Muy silencioso', 'Liquid 360mm').
cooler(ek_aio_basic_240, ek, 'EK AIO Basic 240mm', 110, 'Liquid entry-level', 'Económico', 'Liquid 240mm').

% ==========================================
% TARJETAS MADRE
% ==========================================
% Intel LGA 1700
motherboard(asus_rog_strix_z790_e, asus, 'ASUS ROG STRIX Z790-E GAMING WIFI', 380, 'Gaming/Enthusiast', 'High-end', 'LGA 1700').
motherboard(msi_mpg_z790_edge_wifi, msi, 'MSI MPG Z790 EDGE WIFI', 340, 'Gaming/Performance', 'High-end', 'LGA 1700').
motherboard(gigabyte_z790_aorus_master, gigabyte, 'Gigabyte Z790 AORUS Master', 360, 'Gaming high-end', 'Premium', 'LGA 1700').
motherboard(asus_prime_z790_p, asus, 'ASUS PRIME Z790-P', 220, 'Gaming/Productividad', 'Mid-range', 'LGA 1700').
motherboard(msi_z790_a_pro_wifi, msi, 'MSI Z790-A PRO WIFI', 200, 'Gaming general', 'Mid-range', 'LGA 1700').
motherboard(gigabyte_z790_ud_ac, gigabyte, 'Gigabyte Z790 UD AC', 180, 'Uso general', 'Budget', 'LGA 1700').

% AMD AM5
motherboard(asus_rog_strix_x870_e_e, asus, 'ASUS ROG STRIX X870-E-E Gaming WIFI', 450, 'Gaming Enthusiast', 'Ultra Premium', 'AM5').
motherboard(msi_mpg_x870e_edge_wifi, msi, 'MSI MPG X870E EDGE WIFI', 420, 'Gaming Premium', 'High-end', 'AM5').
motherboard(gigabyte_x870e_aorus_master, gigabyte, 'Gigabyte X870E AORUS Master', 430, 'Gaming Premium', 'High-end', 'AM5').
motherboard(asus_rog_crosshair_x870_e_i, asus, 'ASUS ROG CROSSHAIR X870-E-I', 380, 'Gaming High-end', 'Premium', 'AM5').
motherboard(msi_mpg_b850_edge_wifi, msi, 'MSI MPG B850 EDGE WIFI', 260, 'Gaming mid-high', 'Mid-high', 'AM5').
motherboard(asus_prime_b850_plus, asus, 'ASUS PRIME B850-PLUS', 200, 'Gaming general', 'Mid-range', 'AM5').
motherboard(gigabyte_b850m_ds3h, gigabyte, 'Gigabyte B850M DS3H', 150, 'Budget Gaming', 'Budget', 'AM5').

% AMD AM4 (Legacy)
motherboard(asus_rog_strix_b550_f, asus, 'ASUS ROG STRIX B550-F Gaming WIFI', 200, 'Gaming mid-range', 'Mid-range', 'AM4').
motherboard(msi_b550_tomahawk, msi, 'MSI B550 TOMAHAWK', 160, 'Gaming general', 'Budget-Mid', 'AM4').

% ==========================================
% GABINETES
% ==========================================
case(corsair_crystal_570x, corsair, 'Corsair Crystal Series 570X RGB', 150, 'Gaming mid-tower', 'Tempered Glass', 'Mid-Tower').
case(corsair_icue_4000_airflow, corsair, 'Corsair iCUE 4000 Airflow RGB', 120, 'Gaming airflow', 'Frente mesh', 'Mid-Tower').
case(nzxt_h7_flow, nzxt, 'NZXT H7 Flow', 140, 'Gaming premium', 'Muy buena ventilación', 'Mid-Tower').
case(nzxt_h510_flow, nzxt, 'NZXT H510 Flow', 100, 'Gaming general', 'Buen diseño', 'Mid-Tower').
case(fractal_design_core_1000, fractal, 'Fractal Design Core 1000', 50, 'Budget', 'Económico', 'Mid-Tower').
case(fractal_design_meshify_c, fractal, 'Fractal Design Meshify C', 110, 'Gaming airflow', 'Excelente ventilación', 'Mid-Tower').
case(be_quiet_pure_base_500, be_quiet, 'be quiet! Pure Base 500', 75, 'Gaming silencioso', 'Muy silencioso', 'Mid-Tower').
case(lian_li_lancool_205_mesh, lian_li, 'Lian Li LANCOOL 205 MESH', 55, 'Gaming budget', 'Buen airflow', 'Mid-Tower').
case(corsair_5000t, corsair, 'Corsair 5000T RGB', 300, 'Full tower premium', 'Super espacioso', 'Full Tower').
case(phanteks_eclipse_p400a, phanteks, 'Phanteks Eclipse P400A Digital RGB', 100, 'Gaming airflow', 'Excelente precio', 'Mid-Tower').
case(thermaltake_level_10_gm, thermaltake, 'Thermaltake Level 10 GM', 180, 'Gaming premium', 'Diseño único', 'Mid-Tower').
case(cougar_mx330, cougar, 'COUGAR MX330', 45, 'Budget entry', 'Muy económico', 'Mid-Tower').

% ==========================================
% SISTEMAS DE RESPALDO (UPS / No-Break)
% ==========================================
ups(apc_back_ups_600, apc, 'APC Back-UPS 600VA', 70, 'Respaldo básico', 'Compacto', '600VA').
ups(apc_back_ups_1000, apc, 'APC Back-UPS 1000VA', 110, 'Respaldo general', 'Recomendado', '1000VA').
ups(apc_back_ups_1500, apc, 'APC Back-UPS 1500VA', 180, 'Respaldo premium', 'Alta potencia', '1500VA').
ups(apc_smart_ups_2200, apc, 'APC Smart-UPS 2200VA', 400, 'Respaldo professional', 'Máxima protección', '2200VA').
ups(cyberpower_cp1000avrlcd, cyberpower, 'CyberPower CP1000AVRLCD 1000VA', 100, 'Respaldo económico', 'Buen precio', '1000VA').
ups(cyberpower_cp1500avrlcd, cyberpower, 'CyberPower CP1500AVRLCD 1500VA', 160, 'Respaldo mid-range', 'Buena potencia', '1500VA').
ups(eaton_9sx_2000, eaton, 'Eaton 9SX 2000VA', 350, 'Gaming professional', 'Alta calidad', '2000VA').
ups(sin_respaldo, none, 'No incluir', 0, 'Sin protección', 'Opcional', '0VA').


uso(gaming, 'Gaming').
uso(productividad, 'Productividad/Trabajo').
uso(streaming, 'Streaming').
uso(general, 'Uso general').

rango_presupuesto(bajo, 'Bajo: $800 - $1200', 800, 1200).
rango_presupuesto(medio, 'Medio: $1200 - $2000', 1200, 2000).
rango_presupuesto(alto, 'Alto: $2000 - $3500', 2000, 3500).
rango_presupuesto(muy_alto, 'Muy alto: $3500+', 3500, 10000).

% ==========================================
% REGLAS DE RECOMENDACIÓN
% ==========================================

% Recomendar CPU según presupuesto y uso
recomendar_cpu(Presupuesto, Uso, CPUId, CPU, Precio, Socket) :-
    cpu(CPUId, _, CPU, Precio, UsosPermitidos, _, Socket),
    Precio =< Presupuesto,
    (   Uso == gaming
    ->  (sub_atom(UsosPermitidos, _, _, _, 'Gaming') ; sub_atom(UsosPermitidos, _, _, _, 'gaming'))
    ;   true
    ).

% Recomendar GPU según presupuesto y uso
recomendar_gpu(Presupuesto, Uso, GPUId, GPU, Precio, Vram) :-
    gpu(GPUId, _, GPU, Precio, UsosPermitidos, _, Vram),
    Precio =< Presupuesto,
    (   Uso == gaming
    ->  (sub_atom(UsosPermitidos, _, _, _, 'Gaming') ; sub_atom(UsosPermitidos, _, _, _, 'gaming'))
    ;   true
    ).

% Recomendar RAM según presupuesto
recomendar_ram(Presupuesto, RAMId, RAM, Precio, Tipo) :-
    ram(RAMId, _, RAM, Precio, _, _, Tipo),
    Precio =< Presupuesto.

% Recomendar almacenamiento
recomendar_storage(Presupuesto, StorageId, Storage, Precio, Tipo) :-
    storage(StorageId, _, Storage, Precio, _, _, Tipo),
    Precio =< Presupuesto.

% Recomendar disipador según socket
recomendar_cooler(Presupuesto, CoolerId, Cooler, Precio, Tipo) :-
    cooler(CoolerId, _, Cooler, Precio, _, _, Tipo),
    Precio =< Presupuesto.

% Recomendar motherboard según socket
recomendar_motherboard(Presupuesto, Socket, MBId, MB, Precio, TipoSocket) :-
    motherboard(MBId, _, MB, Precio, _, _, TipoSocket),
    TipoSocket == Socket,
    Precio =< Presupuesto.

% Recomendar gabinete
recomendar_case(Presupuesto, CaseId, Case, Precio, Tipo) :-
    case(CaseId, _, Case, Precio, _, _, Tipo),
    Precio =< Presupuesto.

% Recomendar fuente de poder
recomendar_power(Presupuesto, PSUId, PSU, Precio, Potencia) :-
    power_supply(PSUId, _, PSU, Precio, _, Potencia, _),
    Precio =< Presupuesto.

% Recomendar UPS
recomendar_ups(Presupuesto, UPSId, UPS, Precio, Potencia) :-
    ups(UPSId, _, UPS, Precio, _, _, Potencia),
    Precio =< Presupuesto.

% ==========================================
% CONFIGURACIÓN COMPLETA
% ==========================================

% Obtener todas las opciones disponibles de un componente
opciones_componente(cpu, Lista) :-
    findall(Id-Nombre, cpu(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(gpu, Lista) :-
    findall(Id-Nombre, gpu(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(ram, Lista) :-
    findall(Id-Nombre, ram(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(storage, Lista) :-
    findall(Id-Nombre, storage(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(cooler, Lista) :-
    findall(Id-Nombre, cooler(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(motherboard, Lista) :-
    findall(Id-Nombre, motherboard(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(case, Lista) :-
    findall(Id-Nombre, case(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(power, Lista) :-
    findall(Id-Nombre, power_supply(Id, _, Nombre, _, _, _, _), Lista).

opciones_componente(ups, Lista) :-
    findall(Id-Nombre, ups(Id, _, Nombre, _, _, _, _), Lista).

% Obtener detalles de un componente específico
detalle_cpu(Id, Marca, Nombre, Precio, Usos, Descripcion, Socket) :-
    cpu(Id, Marca, Nombre, Precio, Usos, Descripcion, Socket).

detalle_gpu(Id, Marca, Nombre, Precio, Usos, Descripcion, Vram) :-
    gpu(Id, Marca, Nombre, Precio, Usos, Descripcion, Vram).

detalle_ram(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo) :-
    ram(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo).

detalle_storage(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo) :-
    storage(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo).

detalle_cooler(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo) :-
    cooler(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo).

detalle_motherboard(Id, Marca, Nombre, Precio, Usos, Descripcion, Socket) :-
    motherboard(Id, Marca, Nombre, Precio, Usos, Descripcion, Socket).

detalle_case(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo) :-
    case(Id, Marca, Nombre, Precio, Usos, Descripcion, Tipo).

detalle_power(Id, Marca, Nombre, Precio, Usos, Potencia, Certificacion) :-
    power_supply(Id, Marca, Nombre, Precio, Usos, Potencia, Certificacion).

detalle_ups(Id, Marca, Nombre, Precio, Usos, Descripcion, Potencia) :-
    ups(Id, Marca, Nombre, Precio, Usos, Descripcion, Potencia).

% Calcular presupuesto total
presupuesto_total(CPUPrecio, GPUPrecio, RAMPrecio, StoragePrecio, CoolerPrecio, MBPrecio, CasePrecio, PSUPrecio, UPSPrecio, Total) :-
    Total is CPUPrecio + GPUPrecio + RAMPrecio + StoragePrecio + CoolerPrecio + MBPrecio + CasePrecio + PSUPrecio + UPSPrecio.
