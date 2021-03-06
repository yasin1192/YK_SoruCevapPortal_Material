import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { AdminUyeDialogComponent } from '../admin-uye-dialog/admin-uye-dialog.component';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniUye: Uyeler;
  uyeid: string;
  uye: Uyeler;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  katid: any;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yeniUye = data.kayit;

    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Üye Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.uyeid = localStorage.getItem("uid");
    this.UyeListele();
  }
  FormOlustur() {
    return this.frmBuild.group({
      kuladi: [this.yeniUye.kuladi],
      sifre: [this.yeniUye.sifre],

    });
  }
  UyeListele() {
    this.apiServis.UyeById(this.uyeid).subscribe((d: Uyeler) => {
      this.uye = d;
      console.log(d);
    })
  }

}

