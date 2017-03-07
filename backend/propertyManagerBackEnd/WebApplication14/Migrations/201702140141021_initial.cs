namespace WebApplication14.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.properties",
                c => new
                    {
                        propertyId = c.Int(nullable: false, identity: true),
                        userId = c.Int(nullable: false),
                        propertyName = c.String(),
                        address = c.String(),
                        city = c.String(),
                        state = c.String(),
                        zip = c.Int(nullable: false),
                        contactPhone = c.Int(nullable: false),
                        rent = c.Int(nullable: false),
                        sqrFt = c.Int(nullable: false),
                        leaseTerm = c.Int(nullable: false),
                        bedroomCount = c.Int(nullable: false),
                        bathroomCount = c.Int(nullable: false),
                        propertyImage = c.Binary(),
                        petFriendly = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.propertyId)
                .ForeignKey("dbo.users", t => t.userId, cascadeDelete: true)
                .Index(t => t.userId);
            
            CreateTable(
                "dbo.users",
                c => new
                    {
                        userId = c.Int(nullable: false, identity: true),
                        firstName = c.String(),
                        lastName = c.String(),
                        email = c.String(),
                        isPropertyManager = c.Boolean(nullable: false),
                        userName = c.String(),
                    })
                .PrimaryKey(t => t.userId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.properties", "userId", "dbo.users");
            DropIndex("dbo.properties", new[] { "userId" });
            DropTable("dbo.users");
            DropTable("dbo.properties");
        }
    }
}
