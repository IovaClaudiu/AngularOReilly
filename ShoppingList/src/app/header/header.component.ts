import { Subscription } from "rxjs";
import { AuthService } from "./../auth/auth.service";
import { DataStorageService } from "./../shared/data-storage.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFecthData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
