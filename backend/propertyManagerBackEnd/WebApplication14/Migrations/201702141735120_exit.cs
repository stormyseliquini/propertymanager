namespace WebApplication14.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class exit : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.properties", "propertyName", c => c.String(nullable: false));
            AlterColumn("dbo.properties", "address", c => c.String(nullable: false));
            AlterColumn("dbo.properties", "city", c => c.String(nullable: false));
            AlterColumn("dbo.properties", "state", c => c.String(nullable: false));
            AlterColumn("dbo.properties", "contactPhone", c => c.String(nullable: false, maxLength: 10));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.properties", "contactPhone", c => c.Int(nullable: false));
            AlterColumn("dbo.properties", "state", c => c.String());
            AlterColumn("dbo.properties", "city", c => c.String());
            AlterColumn("dbo.properties", "address", c => c.String());
            AlterColumn("dbo.properties", "propertyName", c => c.String());
        }
    }
}
