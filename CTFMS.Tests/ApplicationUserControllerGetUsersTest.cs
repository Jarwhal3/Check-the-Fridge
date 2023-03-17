using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using System.Data.Entity.Infrastructure;
using System.Linq.Expressions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace CTFMS.Tests
{
    [TestClass]
    public class TestApplicationUserController
    {

        [TestMethod]
        public async Task GetAllUsersAsync()
        {

            var data = new List<ApplicationUser>
            {
                new ApplicationUser { Id = 1, FirstName = "A", LastName = "B", Username = "AB", PasswordHash = GetHash("password"), PasswordSalt = GetSalt("password"), FridgeIngredients=null},           
            }.AsQueryable();

            var mockSet = new Mock<Microsoft.EntityFrameworkCore.DbSet<ApplicationUser>>();
            mockSet.As<IDbAsyncEnumerable<ApplicationUser>>()
                .Setup(m => m.GetAsyncEnumerator())
                .Returns(new TestDbAsyncEnumerator<ApplicationUser>(data.GetEnumerator()));

            mockSet.As<IQueryable<ApplicationUser>>()
                .Setup(m => m.Provider)
                .Returns(new TestDbAsyncQueryProvider<ApplicationUser>(data.Provider));

            mockSet.As<IQueryable<ApplicationUser>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<ApplicationUser>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<ApplicationUser>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

            var mockContext = new Mock<DataContext>();
            mockContext.Setup(c => c.ApplicationUsers).Returns(mockSet.Object);

            var service = new ApplicationUserController(mockContext.Object);
            var users = await service.GetUsers();

            /*
            Assert.AreEqual(1, users.Count);
            Assert.AreEqual("A", users[0].FirstName);     
            Assert.AreEqual("B", users[0].LastName);      
            Assert.AreEqual("AB", users[0].Username);      
            Assert.AreEqual(null, users[0].FridgeIngredients);                 
            */
        }

        public byte[] GetHash(string password)
        {
            byte[] passwordHash;
            using (var hmac = new HMACSHA512())
            {

                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return passwordHash;
            }

        }

        public byte[] GetSalt(string password)
        {
            byte[] passwordSalt;
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;

            }
            return passwordSalt;
        }

    }
    

}