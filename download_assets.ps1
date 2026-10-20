$imgs = @{
    'assets/img/intro/lively-minds.jpg' = 'https://grant-associates.uk.com/imager/media/10833/image-023_5ae402c9837860cd6e4f65e304b3a5fa.jpg'
    'assets/img/intro/climate-emergency.jpg' = 'https://grant-associates.uk.com/imager/media/11965/MFS_500_N36-green_5ae402c9837860cd6e4f65e304b3a5fa.jpg'
    'assets/img/projects/superbloom.jpg' = 'https://grant-associates.uk.com/imager/projects/Superbloom/51158/TOL_609_N52_medium_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/gardens-by-the-bay.jpg' = 'https://grant-associates.uk.com/imager/projects/Gardens-by-the-Bay/18560/SNG233_N814-crop_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/green-city-kigali.jpg' = 'https://grant-associates.uk.com/imager/projects/Green-City-Kigali/71030/GCK_652_N4_medium_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/chelsea-2021.jpg' = 'https://grant-associates.uk.com/imager/projects/Chelsea-2020/38281/Guangzhou-garden_M4A1745_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/mountbatten-house.jpg' = 'https://grant-associates.uk.com/imager/projects/Mountbatten-House/83998/JJ-PLA-021_Andy-Stagg-lr_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/east-village.jpg' = 'https://grant-associates.uk.com/imager/projects/East-Village-Victory-Park-Belvedere/75833/EAV_627_N55_medium_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/barangaroo.jpg' = 'https://grant-associates.uk.com/imager/projects/Barangaroo/28340/BAR_418_N27_medium_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/72-upper-ground.jpg' = 'https://grant-associates.uk.com/imager/projects/72-Upper-Ground/73598/VIS_619_N3_medium_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/bristol-zoo.jpg' = 'https://grant-associates.uk.com/imager/projects/New-Bristol-Zoo/71283/NBZ_630_N6_medium_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/bengaluru-airport.jpg' = 'https://grant-associates.uk.com/imager/projects/Terminal-2-at-Kempegowda-International-Airport-Bengaluru/72474/BIA_385_N21_medium_bc9e4c42e52fd22ff41eda620350ec20.jpg'
    'assets/img/projects/appleby-blue.jpg' = 'https://grant-associates.uk.com/imager/projects/Appleby-Blue-Almshouse/84565/1_TOP5_GODDARDS_Community_Garden-LR_5ae402c9837860cd6e4f65e304b3a5fa.jpg'
    'assets/img/projects/reef-keppel-bay.jpg' = 'https://grant-associates.uk.com/imager/projects/The-Reef-at-Kings-Dock/83925/CAT1_KEP_Pontoon-LR_5ae402c9837860cd6e4f65e304b3a5fa.jpg'
    'assets/img/news/andrew-grant-book.jpg' = 'https://grant-associates.uk.com/imager/news/104316/2af7e35b-83bb-435d-8fcd-d49765bf38cb_4935400de1a047c2953ca88da2888b87.jpg'
    'assets/img/news/hillier-nurseries.jpg' = 'https://grant-associates.uk.com/imager/news/103426/RRS_11_4935400de1a047c2953ca88da2888b87.jpg'
    'assets/img/practice-hero.jpg' = 'https://grant-associates.uk.com/imager/media/10833/image-023_b4d32de2edd68d7354c2bc997fd72d27.jpg'
    'assets/img/contact-hero.jpg' = 'https://grant-associates.uk.com/imager/projects/8707/AIPH_525_N3_b4d32de2edd68d7354c2bc997fd72d27.jpg'
}

New-Item -ItemType Directory -Force -Path 'assets/img/projects', 'assets/img/news', 'assets/img/intro' | Out-Null

foreach ($k in $imgs.Keys) {
    $url = $imgs[$k]
    Write-Host "Downloading $k from $url"
    & curl.exe -s -o $k $url
}
